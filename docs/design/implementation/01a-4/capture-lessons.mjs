import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.join(directory, "screenshots");
const baseUrl = process.env.LESSON_PREVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium";
const routes = {
  pathA: "/learn/courses/arabic-sequence/lessons/apply-sequence",
  pathB: "/learn/courses/context-and-evidence/lessons/context-map",
};

const captures = [
  { name: "path-a-mobile", route: routes.pathA, viewport: { width: 390, height: 844 }, state: "active" },
  { name: "path-a-desktop", route: routes.pathA, viewport: { width: 1440, height: 1000 }, state: "active" },
  { name: "path-b-mobile", route: routes.pathB, viewport: { width: 390, height: 844 }, state: "active" },
  { name: "path-b-desktop", route: routes.pathB, viewport: { width: 1440, height: 1000 }, state: "active" },
  { name: "path-a-tablet", route: routes.pathA, viewport: { width: 768, height: 1024 }, state: "active" },
  { name: "hint-state", route: routes.pathB, viewport: { width: 1440, height: 1000 }, state: "hint" },
  { name: "incorrect-feedback", route: routes.pathA, viewport: { width: 1440, height: 1000 }, state: "incorrect" },
  { name: "completion-state", route: routes.pathB, viewport: { width: 1440, height: 1000 }, state: "complete" },
];

const correctAnswers = ["٢٥–٣٧", "تذكر بطاقة المصدر", "وفق قاعدة المقرر"];

async function start(page) {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
}

async function prepare(page, state) {
  await start(page);
  if (state === "hint") await page.getByRole("button", { name: "أرني تلميحًا" }).click();
  if (state === "incorrect") {
    await page.getByRole("radio", { name: /ثمَّ/ }).check();
    await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  }
  if (state === "complete") {
    for (const [index, label] of correctAnswers.entries()) {
      await page.getByRole("radio", { name: new RegExp(label) }).check();
      await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
      await page.getByRole("button", { name: index === correctAnswers.length - 1 ? "اعرض ملخص الإكمال" : "النشاط التالي" }).click();
    }
  }
}

await mkdir(screenshotDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
const failures = [];

for (const capture of captures) {
  const page = await browser.newPage({ viewport: capture.viewport, locale: "ar-EG", reducedMotion: "reduce" });
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
  await page.goto(`${baseUrl}${capture.route}`, { waitUntil: "networkidle" });
  await prepare(page, capture.state);
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press("Tab");

  const audit = await page.evaluate(() => ({
    direction: document.documentElement.dir,
    focusVisible: Boolean(document.activeElement?.matches(":focus-visible")),
    hasLessonPlayer: Boolean(document.querySelector('[data-testid="lesson-player"]')),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    language: document.documentElement.lang,
  }));
  const currentFailures = [];
  if (audit.language !== "ar" || audit.direction !== "rtl") currentFailures.push("invalid Arabic RTL metadata");
  if (!audit.hasLessonPlayer) currentFailures.push("lesson player missing");
  if (audit.horizontalOverflow) currentFailures.push("horizontal overflow");
  if (!audit.focusVisible) currentFailures.push("focus indicator unavailable after interaction");
  if (runtimeErrors.length) currentFailures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

  const output = `${capture.name}.png`;
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    const skipLink = document.querySelector('a[href="#lesson-main"]');
    if (skipLink instanceof HTMLElement) skipLink.style.visibility = "hidden";
  });
  await page.screenshot({ path: path.join(screenshotDirectory, output), fullPage: true });
  console.log(`${currentFailures.length ? "FAIL" : "PASS"} ${output} @ ${capture.viewport.width}px${currentFailures.length ? ` — ${currentFailures.join(", ")}` : ""}`);
  failures.push(...currentFailures.map((failure) => `${capture.name}: ${failure}`));
  await page.close();
}

await browser.close();
if (failures.length) process.exitCode = 1;
