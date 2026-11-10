import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.join(directory, "screenshots");
const baseUrl = process.env.SHELL_PREVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const viewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};

await mkdir(screenshotDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const failures = [];

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport, locale: "ar-EG", reducedMotion: "reduce" });
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`${message.text()} @ ${message.location().url || "unknown"}`);
  });
  await page.goto(`${baseUrl}/shell-preview`);
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press("Tab");

  const audit = await page.evaluate((viewportName) => {
    const visible = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    return {
      direction: document.documentElement.dir,
      focusVisible: Boolean(document.activeElement?.matches(":focus-visible")),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      language: document.documentElement.lang,
      mobileNavigationVisible: visible('[data-shell-navigation="mobile"]'),
      railVisible: visible('[data-shell-navigation="rail"]'),
      viewportName,
    };
  }, name);

  const currentFailures = [];
  if (audit.language !== "ar" || audit.direction !== "rtl") currentFailures.push("invalid Arabic RTL metadata");
  if (audit.horizontalOverflow) currentFailures.push("horizontal overflow");
  if (!audit.focusVisible) currentFailures.push("focus indicator unavailable");
  if (name === "mobile" && (!audit.mobileNavigationVisible || audit.railVisible)) currentFailures.push("incorrect mobile navigation");
  if (name !== "mobile" && (audit.mobileNavigationVisible || !audit.railVisible)) currentFailures.push("incorrect rail navigation");
  if (runtimeErrors.length) currentFailures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

  // Keep the focus audit independent from the clean visual-review artifact.
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });

  const output = `application-shell-${name}.png`;
  await page.screenshot({ path: path.join(screenshotDirectory, output), fullPage: true });
  console.log(`${currentFailures.length ? "FAIL" : "PASS"} ${output} @ ${viewport.width}px${currentFailures.length ? ` — ${currentFailures.join(", ")}` : ""}`);
  failures.push(...currentFailures.map((failure) => `${name}: ${failure}`));
  await page.close();
}

await browser.close();
if (failures.length) process.exitCode = 1;
