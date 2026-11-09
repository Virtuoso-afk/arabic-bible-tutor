import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.join(directory, "screenshots");
const baseUrl = process.env.SUPPORT_PREVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium";
const lesson = "/learn/courses/context-and-evidence/lessons/context-map";

const captures = [
  { name: "progress-desktop", route: "/learn/progress", viewport: { width: 1440, height: 1000 } },
  { name: "progress-mobile", route: "/learn/progress", viewport: { width: 390, height: 844 } },
  { name: "settings-desktop", route: "/settings/learning", viewport: { width: 1440, height: 1000 }, state: "settings" },
  { name: "settings-mobile", route: "/settings/learning", viewport: { width: 390, height: 844 }, state: "settings" },
  { name: "tutor-grounded", route: lesson, viewport: { width: 1440, height: 1000 }, state: "grounded-explanation" },
  { name: "tutor-insufficient-grounding", route: lesson, viewport: { width: 1440, height: 1000 }, state: "insufficient-grounding" },
  { name: "tutor-correction-review", route: lesson, viewport: { width: 1440, height: 1000 }, state: "corrected-explanation" },
  { name: "tutor-unavailable", route: lesson, viewport: { width: 1440, height: 1000 }, state: "tutor-unavailable" },
  { name: "progress-tablet", route: "/learn/progress", viewport: { width: 768, height: 1024 } },
];

async function prepare(page, state) {
  if (state === "settings") {
    await page.getByRole("radio", { name: "كبير", exact: true }).check();
    await page.getByRole("checkbox", { name: "تباين أوضح للمعاينة" }).check();
    return;
  }
  if (state?.includes("explanation") || state === "insufficient-grounding" || state === "tutor-unavailable") {
    await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
    await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption(state);
  }
}

await mkdir(screenshotDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
const failures = [];

for (const capture of captures) {
  const page = await browser.newPage({ viewport: capture.viewport, locale: "ar-EG", reducedMotion: "reduce" });
  const runtimeErrors = [];
  const externalRequests = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
  page.on("request", (request) => { if (!request.url().startsWith(baseUrl)) externalRequests.push(request.url()); });
  await page.goto(`${baseUrl}${capture.route}`, { waitUntil: "networkidle" });
  await prepare(page, capture.state);
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press("Tab");

  const audit = await page.evaluate(() => ({
    direction: document.documentElement.dir,
    focusVisible: Boolean(document.activeElement?.matches(":focus-visible")),
    hasMain: Boolean(document.querySelector("main")),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    language: document.documentElement.lang,
  }));
  const currentFailures = [];
  if (audit.language !== "ar" || audit.direction !== "rtl") currentFailures.push("invalid Arabic RTL metadata");
  if (!audit.hasMain) currentFailures.push("primary content missing");
  if (audit.horizontalOverflow) currentFailures.push("horizontal overflow");
  if (!audit.focusVisible) currentFailures.push("focus indicator unavailable after interaction");
  if (runtimeErrors.length) currentFailures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);
  if (externalRequests.length) currentFailures.push(`external requests: ${externalRequests.join(" | ")}`);

  const output = `${capture.name}.png`;
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (link instanceof HTMLElement && getComputedStyle(link).position === "fixed") link.style.visibility = "hidden";
    });
  });
  await page.screenshot({ path: path.join(screenshotDirectory, output), fullPage: true });
  console.log(`${currentFailures.length ? "FAIL" : "PASS"} ${output} @ ${capture.viewport.width}px${currentFailures.length ? ` — ${currentFailures.join(", ")}` : ""}`);
  failures.push(...currentFailures.map((failure) => `${capture.name}: ${failure}`));
  await page.close();
}

await browser.close();
if (failures.length) process.exitCode = 1;
