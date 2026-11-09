import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.join(directory, "screenshots");
const baseUrl = process.env.PUBLIC_PREVIEW_BASE_URL ?? "http://127.0.0.1:3000";
const viewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};
const screens = {
  landing: { route: "/", heading: "تقدّمٌ له معنى." },
  "path-a": { route: "/learn/paths/arabic-language", heading: "أتعلّم العربية من خلال مراجع كتابية" },
  "path-b": { route: "/learn/paths/bible-study", heading: "أدرس الكتاب بالعربية مع معلّم سياقي" },
};

await mkdir(screenshotDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const failures = [];

for (const [screenName, screen] of Object.entries(screens)) {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport, locale: "ar-EG", reducedMotion: "reduce" });
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
    await page.goto(`${baseUrl}${screen.route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.keyboard.press("Tab");

    const audit = await page.evaluate((expectedHeading) => ({
      direction: document.documentElement.dir,
      focusVisible: Boolean(document.activeElement?.matches(":focus-visible")),
      headingVisible: [...document.querySelectorAll("h1")].some((heading) => heading.textContent?.includes(expectedHeading) && heading.getBoundingClientRect().height > 0),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      language: document.documentElement.lang,
    }), screen.heading);

    const currentFailures = [];
    if (audit.language !== "ar" || audit.direction !== "rtl") currentFailures.push("invalid Arabic RTL metadata");
    if (!audit.headingVisible) currentFailures.push("primary heading unavailable");
    if (audit.horizontalOverflow) currentFailures.push("horizontal overflow");
    if (!audit.focusVisible) currentFailures.push("focus indicator unavailable");
    if (runtimeErrors.length) currentFailures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

    await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
    const output = `${screenName}-${viewportName}.png`;
    await page.screenshot({ path: path.join(screenshotDirectory, output), fullPage: true });
    console.log(`${currentFailures.length ? "FAIL" : "PASS"} ${output} @ ${viewport.width}px${currentFailures.length ? ` — ${currentFailures.join(", ")}` : ""}`);
    failures.push(...currentFailures.map((failure) => `${screenName}/${viewportName}: ${failure}`));
    await page.close();
  }
}

await browser.close();
if (failures.length) process.exitCode = 1;
