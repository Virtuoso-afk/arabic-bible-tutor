import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:3000";
const output = path.resolve("docs/qa/01b/screenshots");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const context = await browser.newContext({ locale: "ar-EG" });
const page = await context.newPage();
const errors = [];
const external = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
page.on("request", (request) => { if (!request.url().startsWith(baseURL)) external.push(request.url()); });

async function capture(name, route, viewport, prepare) {
  await page.setViewportSize(viewport);
  await page.goto(`${baseURL}${route}`);
  if (prepare) await prepare();
  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, dir: document.documentElement.dir, lang: document.documentElement.lang }));
  if (metrics.scroll > metrics.width + 1 || metrics.dir !== "rtl" || metrics.lang !== "ar") throw new Error(`${name}: ${JSON.stringify(metrics)}`);
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true });
  console.log(`PASS ${name} ${viewport.width}x${viewport.height}`);
}

await capture("chromium-landing-desktop", "/", { width: 1440, height: 1000 });
await capture("chromium-dashboard-mobile", "/learn", { width: 390, height: 844 });
await capture("chromium-path-a-feedback-mobile", "/learn/courses/arabic-sequence/lessons/apply-sequence", { width: 390, height: 844 }, async () => {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  await page.getByRole("radio", { name: /ثمَّ/ }).check();
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
});
await capture("chromium-path-b-tutor-focus-desktop", "/learn/courses/context-and-evidence/lessons/context-map", { width: 1440, height: 1000 }, async () => {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption("tutor-unavailable");
});
await capture("chromium-long-arabic-320", "/learn/courses/context-and-evidence/lessons/context-map", { width: 320, height: 720 }, async () => {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  const stress = "تَعَلُّمُ العَرَبِيَّةِ يَحتاجُ إلى مُلاحظةٍ دقيقةٍ للسِّياق، وعلاماتِ الترقيم؛ ثمَّ تطبيقٍ متأنٍّ على مرجعٍ تعليمي طويل جدًا ١٢٣٤٥ — دون فقدان المعنى أو ترتيب الكلمات.";
  await page.locator("#activity-title").evaluate((element, value) => { element.textContent = value; }, stress);
});
await capture("chromium-text-resize-200", "/learn/courses/arabic-sequence/lessons/apply-sequence", { width: 1280, height: 900 }, async () => {
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
});
if (errors.length || external.length) throw new Error(JSON.stringify({ errors, external }, null, 2));
errors.length = 0;
await capture("chromium-not-found-mobile", "/unknown-qa-route", { width: 390, height: 844 });

if (external.length || errors.some((error) => !error.includes("404 (Not Found)"))) throw new Error(JSON.stringify({ errors, external }, null, 2));
await browser.close();
