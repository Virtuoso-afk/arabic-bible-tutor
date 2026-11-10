import { expect, test } from "@playwright/test";
import { expectNoDocumentOverflow, pathA, pathB, startLesson } from "./helpers";

const routes = ["/", "/learn", "/learn/courses", "/learn/courses/arabic-sequence", pathA, pathB, "/learn/progress", "/settings/learning"];
const viewports = [
  { width: 320, height: 720 }, { width: 375, height: 812 }, { width: 390, height: 844 },
  { width: 430, height: 932 }, { width: 768, height: 1024 }, { width: 1024, height: 768 },
  { width: 1440, height: 1000 }, { width: 1920, height: 1080 },
];

test("representative routes reflow at the complete width matrix", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("lang", "ar");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expectNoDocumentOverflow(page, `${route} at ${viewport.width}x${viewport.height}`);
      await expect(page.locator("main:visible")).toHaveCount(1);
    }
  }
});

test("portrait and landscape layouts retain required controls", async ({ page }) => {
  for (const viewport of [{ width: 430, height: 932 }, { width: 932, height: 430 }]) {
    await page.setViewportSize(viewport);
    await page.goto(pathA);
    await startLesson(page);
    await expect(page.getByRole("group", { name: "اختر إجابة واحدة" })).toBeVisible();
    await expect(page.getByRole("button", { name: "تحقّق من الإجابة" })).toBeVisible();
    await expectNoDocumentOverflow(page, `lesson orientation ${viewport.width}x${viewport.height}`);
  }
});

test("200 percent text resize and 400 percent effective reflow retain content", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ["/", pathA, "/settings/learning"]) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expectNoDocumentOverflow(page, `${route} with 200% root text`);
    await expect(page.locator("main:visible")).toHaveCount(1);
    if (route === pathA) {
      const panel = await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).locator("xpath=..").boundingBox();
      expect(panel, "lesson start panel remains readable at 200% text").not.toBeNull();
      expect(panel!.width).toBeGreaterThanOrEqual(900);
    }
  }

  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of ["/", pathA, "/learn/progress", "/settings/learning"]) {
    await page.goto(route);
    await expectNoDocumentOverflow(page, `${route} at a 320 CSS px effective viewport (1280 at 400%)`);
    await expect(page.locator("main:visible")).toHaveCount(1);
  }
});

test("long Arabic, diacritics, punctuation, numerals, and bidi references wrap safely", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(pathB);
  await startLesson(page);
  const stress = "تَعَلُّمُ العَرَبِيَّةِ يَحتاجُ إلى مُلاحظةٍ دقيقةٍ للسِّياق، وعلاماتِ الترقيم؛ ثمَّ تطبيقٍ متأنٍّ على مرجعٍ تعليمي طويل جدًا ١٢٣٤٥ — دون فقدان المعنى أو ترتيب الكلمات.";
  await page.locator("#activity-title").evaluate((element, value) => { element.textContent = value; }, stress);
  await page.getByRole("radio").first().locator("xpath=..").evaluate((element, value) => { const strong = element.querySelector("strong"); if (strong) strong.textContent = value; }, stress);
  await expectNoDocumentOverflow(page, "long Arabic stress fixture");
  const headingStyle = await page.locator("#activity-title").evaluate((element) => ({
    direction: getComputedStyle(element).direction,
    lineHeight: parseFloat(getComputedStyle(element).lineHeight),
    fontSize: parseFloat(getComputedStyle(element).fontSize),
  }));
  expect(headingStyle.direction).toBe("rtl");
  expect(headingStyle.lineHeight).toBeGreaterThan(headingStyle.fontSize);
  await expect(page.locator('bdi[dir="ltr"]')).toHaveCount(2);
});

test("primary touch controls meet the 44 CSS pixel design target", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(pathA);
  await startLesson(page);
  for (const locator of [page.getByRole("radio").first().locator("xpath=.."), page.getByRole("button", { name: "أرني تلميحًا" }), page.getByRole("button", { name: "تحقّق من الإجابة" })]) {
    const box = await locator.boundingBox();
    expect(box, "control has a rendered box").not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("the fixed mobile lesson utility does not cover focused feedback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(pathA);
  await startLesson(page);
  await page.getByRole("radio", { name: /ثمَّ/ }).check();
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  const feedback = await page.getByTestId("feedback-panel").boundingBox();
  const utility = await page.getByTestId("mobile-lesson-utility").boundingBox();
  expect(feedback).not.toBeNull();
  expect(utility).not.toBeNull();
  const overlaps = feedback!.y < utility!.y + utility!.height && feedback!.y + feedback!.height > utility!.y;
  expect(overlaps).toBe(false);
});
