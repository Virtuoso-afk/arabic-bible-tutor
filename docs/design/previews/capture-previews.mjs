import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const previewDirectory = path.dirname(fileURLToPath(import.meta.url));
const screenshotDirectory = path.resolve(previewDirectory, "../screenshots");

const concepts = [
  ["a-modern-academy", "concept-a-modern-academy.html"],
  ["b-learning-quest", "concept-b-learning-quest.html"],
  ["c-contemporary-scholar", "concept-c-contemporary-scholar.html"],
];
const screens = ["landing", "dashboard", "lesson"];
const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 1000 },
};

await mkdir(screenshotDirectory, { recursive: true });

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};
const server = createServer(async (request, response) => {
  try {
    const requestPath = new URL(request.url, "http://localhost").pathname;
    if (requestPath === "/favicon.ico") {
      response.writeHead(204);
      response.end();
      return;
    }
    const requestedName = path.basename(requestPath);
    const filePath = path.join(previewDirectory, requestedName || "concept-a-modern-academy.html");
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

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium",
  args: ["--no-sandbox"],
});

const results = [];

for (const [conceptSlug, fileName] of concepts) {
  for (const screen of screens) {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      const page = await browser.newPage({ viewport, locale: "ar-EG" });
      const runtimeErrors = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(message.text());
      });

      const url = new URL(`http://127.0.0.1:${port}/${fileName}`);
      url.searchParams.set("screen", screen);
      url.searchParams.set("capture", "1");
      await page.goto(url.href);
      await page.evaluate(() => document.fonts.ready);

      const audit = await page.evaluate((expectedScreen) => {
        const visibleScreens = [...document.querySelectorAll("[data-preview]")]
          .filter((element) => !element.hidden)
          .map((element) => element.dataset.preview);
        const clippedElements = [...document.querySelectorAll(`[data-preview="${expectedScreen}"] *`)]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1);
          })
          .slice(0, 5)
          .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
        return {
          direction: document.documentElement.dir,
          language: document.documentElement.lang,
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          clippedElements,
          visibleScreens,
          expectedScreen,
        };
      }, screen);

      const failures = [];
      if (audit.direction !== "rtl" || audit.language !== "ar") failures.push("invalid Arabic RTL metadata");
      if (audit.overflow) failures.push("horizontal overflow");
      if (audit.clippedElements.length) failures.push(`clipped elements: ${audit.clippedElements.join(" | ")}`);
      if (audit.visibleScreens.length !== 1 || audit.visibleScreens[0] !== screen) failures.push("incorrect visible screen");
      if (runtimeErrors.length) failures.push(`runtime errors: ${runtimeErrors.join(" | ")}`);

      const outputName = `${conceptSlug}-${screen}-${viewportName}.png`;
      await page.screenshot({
        path: path.join(screenshotDirectory, outputName),
        fullPage: true,
      });
      results.push({ outputName, width: viewport.width, audit, failures });
      await page.close();
    }
  }
}

await browser.close();
await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));

for (const result of results) {
  const status = result.failures.length ? "FAIL" : "PASS";
  console.log(`${status} ${result.outputName} @ ${result.width}px${result.failures.length ? ` — ${result.failures.join(", ")}` : ""}`);
}

if (results.some((result) => result.failures.length)) process.exitCode = 1;
