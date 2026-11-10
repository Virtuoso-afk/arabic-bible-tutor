import { expect, type Page } from "@playwright/test";

export const pathA = "/learn/courses/arabic-sequence/lessons/apply-sequence";
export const pathB = "/learn/courses/context-and-evidence/lessons/context-map";

export const lessonAnswers = {
  [pathA]: ["عادَ", "ثمَّ", "نزل المسافرون"],
  [pathB]: ["٢٥–٣٧", "تذكر بطاقة المصدر", "وفق قاعدة المقرر"],
} as const;

export async function startLesson(page: Page) {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  await expect(page.locator("#activity-title")).toBeFocused();
}

export async function completeLessonByKeyboard(page: Page, answers: readonly string[]) {
  for (const [index, answer] of answers.entries()) {
    const radio = page.getByRole("radio", { name: new RegExp(answer) });
    await radio.focus();
    await page.keyboard.press("Space");
    await expect(radio).toBeChecked();
    const submit = page.getByRole("button", { name: "تحقّق من الإجابة" });
    await submit.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("feedback-panel")).toBeFocused();
    const next = page.getByRole("button", { name: index === answers.length - 1 ? "اعرض ملخص الإكمال" : "النشاط التالي" });
    await next.focus();
    await page.keyboard.press("Enter");
  }
}

export async function expectNoDocumentOverflow(page: Page, context: string) {
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.scrollWidth, context).toBeLessThanOrEqual(metrics.clientWidth + 1);
}
