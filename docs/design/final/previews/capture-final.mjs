import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const previewDirectory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.resolve(previewDirectory, "../screenshots");
const screens = ["landing", "dashboard", "lesson"];
const viewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};

await mkdir(screenshotDirectory, { recursive: true });

const contentTypes = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const server = createServer(async (request, response) => {
  try {
    const requestPath = new URL(request.url, "http://localhost").pathname;
    if (requestPath === "/favicon.ico") {
      response.writeHead(204).end();
      return;
    }
    const name = path.basename(requestPath) || "pd004-hybrid.html";
    const filePath = path.join(previewDirectory, name);
    const body = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const port = typeof address === "object" && address ? address.port : null;
if (!port) throw new Error("Preview server did not start");

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const results = [];

for (const screen of screens) {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport, locale: "ar-EG", reducedMotion: "reduce" });
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });

    const url = new URL(`http://127.0.0.1:${port}/pd004-hybrid.html`);
    url.searchParams.set("screen", screen);
    url.searchParams.set("capture", "1");
    if (screen === "lesson") url.searchParams.set("state", "review");
    await page.goto(url.href);
    await page.evaluate(() => document.fonts.ready);

    const primarySelectors = {
      landing: ".hero-actions .button-primary",
      dashboard: ".continue-card .button-light",
      lesson: "[data-check-answer]",
    };
    const audit = await page.evaluate(({ expectedScreen, primarySelector }) => {
      const isVisible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const clipped = [...document.querySelectorAll(`[data-screen="${expectedScreen}"] *`)]
        .filter((element) => isVisible(element) && !(element instanceof SVGElement) && element.getAttribute("aria-hidden") !== "true")
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < -1 || rect.right > innerWidth + 1;
        })
        .slice(0, 8)
        .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
      const visibleScreens = [...document.querySelectorAll("[data-screen]")].filter(isVisible).map((element) => element.dataset.screen);
      const primary = document.querySelector(primarySelector);
      return {
        direction: document.documentElement.dir,
        language: document.documentElement.lang,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        clipped,
        visibleScreens,
        primaryVisible: Boolean(primary && isVisible(primary)),
      };
    }, { expectedScreen: screen, primarySelector: primarySelectors[screen] });

    await page.keyboard.press("Tab");
    const focusAudit = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      visible: Boolean(document.activeElement?.matches(":focus-visible")),
    }));

    const failures = [];
    if (audit.direction !== "rtl" || audit.language !== "ar") failures.push("invalid Arabic RTL metadata");
    if (audit.horizontalOverflow) failures.push("horizontal overflow");
    if (audit.clipped.length) failures.push(`clipped elements: ${audit.clipped.join(" | ")}`);
    if (audit.visibleScreens.length !== 1 || audit.visibleScreens[0] !== screen) failures.push("incorrect visible screen");
    if (!audit.primaryVisible) failures.push("primary action not visible");
    if (!focusAudit.visible) failures.push("keyboard focus indicator unavailable");
    if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

    const outputName = `pd004-${screen}-${viewportName}.png`;
    await page.screenshot({ path: path.join(screenshotDirectory, outputName), fullPage: true });
    results.push({ outputName, viewport, audit, focusAudit, failures });
    await page.close();
  }
}

const interactionPage = await browser.newPage({ viewport: viewports.mobile, locale: "ar-EG", reducedMotion: "reduce" });
await interactionPage.goto(`http://127.0.0.1:${port}/pd004-hybrid.html?screen=landing&capture=1`);
await interactionPage.locator(".public-header [data-go=dashboard]").click();
if (await interactionPage.locator('[data-screen="dashboard"]:not([hidden])').count() !== 1) throw new Error("Landing-to-dashboard navigation failed");
await interactionPage.locator(".continue-card [data-go=lesson]").click();
await interactionPage.locator('[data-answer="observation"]').click();
await interactionPage.locator("[data-check-answer]").click();
if (await interactionPage.locator(".feedback-panel:not([hidden])").count() !== 1) throw new Error("Correct-answer feedback failed");
await interactionPage.locator(".lesson-actions [data-hint-toggle]").click();
if (await interactionPage.locator(".hint-panel:not([hidden])").count() !== 1) throw new Error("Progressive hint failed");
await interactionPage.locator('[data-prompt="layers"]').click();
if (await interactionPage.locator(".tutor-response:not([hidden])").count() !== 1) throw new Error("Tutor prompt simulation failed");
await interactionPage.close();

await browser.close();
await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));

for (const result of results) {
  const status = result.failures.length ? "FAIL" : "PASS";
  console.log(`${status} ${result.outputName} @ ${result.viewport.width}px${result.failures.length ? ` — ${result.failures.join(", ")}` : ""}`);
}
console.log("PASS deterministic interaction smoke — navigation, answer feedback, hint, and tutor prompt");
if (results.some((result) => result.failures.length)) process.exitCode = 1;
