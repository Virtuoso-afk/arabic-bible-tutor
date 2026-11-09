import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.join(directory, "screenshots");
const baseUrl = process.env.LEARNING_PREVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const viewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};
const screens = [
  { name: "dashboard", route: "/learn", heading: "مرحبًا، مريم", widths: ["mobile", "tablet", "desktop"] },
  { name: "course-discovery", route: "/learn/courses", heading: "استكشف المقررات", widths: ["mobile", "tablet", "desktop"] },
  { name: "course-detail", route: "/learn/courses/arabic-sequence", heading: "من الفهم إلى التعبير", widths: ["mobile", "desktop"] },
];

await mkdir(screenshotDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const failures = [];

for (const screen of screens) {
  for (const widthName of screen.widths) {
    const viewport = viewports[widthName];
    const page = await browser.newPage({ viewport, locale: "ar-EG", reducedMotion: "reduce" });
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
    await page.goto(`${baseUrl}${screen.route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.keyboard.press("Tab");
    const audit = await page.evaluate(({ expectedHeading, mobile }) => {
      const visible = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return getComputedStyle(element).display !== "none" && rect.width > 0 && rect.height > 0;
      };
      return {
        direction: document.documentElement.dir,
        focusVisible: Boolean(document.activeElement?.matches(":focus-visible")),
        headingVisible: [...document.querySelectorAll("h1")].some((heading) => heading.textContent?.includes(expectedHeading)),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        language: document.documentElement.lang,
        navigationCorrect: mobile ? visible('[data-shell-navigation="mobile"]') && !visible('[data-shell-navigation="rail"]') : visible('[data-shell-navigation="rail"]') && !visible('[data-shell-navigation="mobile"]'),
      };
    }, { expectedHeading: screen.heading, mobile: widthName === "mobile" });
    const currentFailures = [];
    if (audit.language !== "ar" || audit.direction !== "rtl") currentFailures.push("invalid Arabic RTL metadata");
    if (!audit.headingVisible) currentFailures.push("primary heading unavailable");
    if (audit.horizontalOverflow) currentFailures.push("horizontal overflow");
    if (!audit.focusVisible) currentFailures.push("focus indicator unavailable");
    if (!audit.navigationCorrect) currentFailures.push("incorrect responsive navigation");
    if (runtimeErrors.length) currentFailures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);
    await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
    const output = `${screen.name}-${widthName}.png`;
    await page.screenshot({ path: path.join(screenshotDirectory, output), fullPage: true });
    console.log(`${currentFailures.length ? "FAIL" : "PASS"} ${output} @ ${viewport.width}px${currentFailures.length ? ` — ${currentFailures.join(", ")}` : ""}`);
    failures.push(...currentFailures.map((failure) => `${screen.name}/${widthName}: ${failure}`));
    await page.close();
  }
}

await browser.close();
if (failures.length) process.exitCode = 1;
