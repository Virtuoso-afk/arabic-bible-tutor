import { expect, test, type Page } from "@playwright/test";

const pathA = "/learn/courses/arabic-sequence/lessons/apply-sequence";
const pathB = "/learn/courses/context-and-evidence/lessons/context-map";

async function startLesson(page: Page) {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
}

async function answer(page: Page, label: string) {
  await page.getByRole("radio", { name: new RegExp(label) }).check();
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
}

async function completeLesson(page: Page, answers: string[]) {
  for (const [index, answerLabel] of answers.entries()) {
    await answer(page, answerLabel);
    await expect(page.getByTestId("feedback-panel")).toContainText("صحيح");
    await page.getByRole("button", { name: index === answers.length - 1 ? "اعرض ملخص الإكمال" : "النشاط التالي" }).click();
  }
}

test("Path A completes a coherent language lesson", async ({ page }) => {
  await page.goto(pathA);
  await expect(page.getByRole("heading", { level: 1, name: "رتّب الأحداث بأفعال الماضي" })).toBeVisible();
  await expect(page.getByText("نقيس فهم اللغة")).toBeVisible();
  await expect(page.getByText(/لا يعرض هذا النموذج نص ترجمة/)).toBeVisible();
  await startLesson(page);
  await completeLesson(page, ["عادَ", "ثمَّ", "نزل المسافرون"]);
  await expect(page.getByTestId("completion-panel")).toContainText("تمييز فعل الماضي");
  await expect(page.getByTestId("completion-panel")).toContainText("استخدام روابط التسلسل");
  await expect(page.getByTestId("completion-panel")).toContainText("لا يعني إتقانًا");
});

test("Path B completes a source-literacy lesson without grading belief", async ({ page }) => {
  await page.goto(pathB);
  await expect(page.getByText("نقيس الاستدلال، لا الاعتقاد")).toBeVisible();
  await expect(page.getByText(/لا تُقيَّم القناعة أو الهوية/)).toBeVisible();
  await startLesson(page);
  await completeLesson(page, ["٢٥–٣٧", "تذكر بطاقة المصدر", "وفق قاعدة المقرر"]);
  await expect(page.getByTestId("completion-panel")).toContainText("التنقل في المرجع");
  await expect(page.getByTestId("completion-panel")).toContainText("تمييز طبقات المحتوى");
  await expect(page.getByTestId("completion-panel")).toContainText("الاستدلال المسند");
});

test("wrong answers explain the reasoning, support retry, and clear stale feedback", async ({ page }) => {
  await page.goto(pathA);
  await startLesson(page);
  await answer(page, "ثمَّ");
  const feedback = page.getByTestId("feedback-panel");
  await expect(feedback).toContainText("راجع وظيفة الكلمة وزمنها");
  await expect(feedback).toContainText("خطوة علاجية");
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-lesson-status", "retry-available");

  await page.getByRole("radio", { name: /عادَ/ }).check();
  await expect(feedback).toHaveCount(0);
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-lesson-status", "answer-selected");
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  await expect(feedback).toContainText("صحيح");
});

test("hints progress without silently submitting an answer", async ({ page }) => {
  await page.goto(pathB);
  await startLesson(page);
  await page.getByRole("button", { name: "أرني تلميحًا" }).click();
  await expect(page.getByTestId("hint-panel")).toContainText("تلميح 1 من 2");
  await page.getByRole("button", { name: "تلميح أوضح" }).click();
  await expect(page.getByTestId("hint-panel")).toContainText("تلميح 2 من 2");
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-evidence-count", "0");
});

test("submission is guarded and completion can be restarted", async ({ page }) => {
  await page.goto(pathA);
  await startLesson(page);
  await page.getByRole("radio", { name: /عادَ/ }).check();
  const submit = page.getByRole("button", { name: "تحقّق من الإجابة" });
  await submit.evaluate((button: HTMLButtonElement) => { button.click(); button.click(); });
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-evidence-count", "1");
  await page.getByRole("button", { name: "النشاط التالي" }).click();
  await answer(page, "ثمَّ");
  await page.getByRole("button", { name: "النشاط التالي" }).click();
  await answer(page, "نزل المسافرون");
  await page.getByRole("button", { name: "اعرض ملخص الإكمال" }).click();
  await page.getByRole("button", { name: "أعد تشغيل العرض" }).click();
  await expect(page.getByRole("button", { name: "ابدأ الدرس التجريبي" })).toBeVisible();
  await expect(page.getByText("أُعيد ضبط العرض. لم تُحفظ المحاولة السابقة.")).toBeVisible();
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-evidence-count", "0");
});

test("available course details and dashboard navigate to real lessons", async ({ page }) => {
  await page.goto("/learn/courses/arabic-sequence");
  await page.getByRole("link", { name: "ابدأ الدرس التفاعلي" }).click();
  await expect(page).toHaveURL(new RegExp(`${pathA}$`));
  await page.goto("/learn/courses/context-and-evidence");
  await page.getByRole("link", { name: "ابدأ الدرس التفاعلي" }).click();
  await expect(page).toHaveURL(new RegExp(`${pathB}$`));
  await page.goto("/learn");
  await expect(page.getByRole("link", { name: /ابدأ الدرس التفاعلي/ })).toHaveAttribute("href", pathA);
});

test("path sessions are independent and refresh honestly resets session state", async ({ page }) => {
  await page.goto(pathA);
  await startLesson(page);
  await page.getByRole("radio", { name: /عادَ/ }).check();
  await page.goto(pathB);
  await startLesson(page);
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await page.getByRole("radio", { name: /٢٥–٣٧/ }).check();
  await page.reload();
  await expect(page.getByRole("button", { name: "ابدأ الدرس التجريبي" })).toBeVisible();
  await expect(page.getByText(/كل الأدلة تبقى داخل هذه الصفحة حتى تحديثها/)).toBeVisible();
});

test("lesson semantics, keyboard controls, disclosure, responsiveness, and runtime are sound", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

  for (const route of [pathA, pathB]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByText("الذكاء الاصطناعي غير متصل")).toBeVisible();
    await expect(page.getByText("لا توجد محادثة حية")).toBeVisible();
    await expect(page.getByRole("progressbar", { name: /تقدم الدرس/ })).toBeVisible();
    await startLesson(page);
    await expect(page.getByRole("combobox", { name: "حالة المعلّم التجريبية" })).toBeVisible();
    const radios = page.getByRole("radio");
    await radios.first().focus();
    await page.keyboard.press("ArrowDown");
    await expect(radios.nth(1)).toBeChecked();
    await expect(page.getByRole("group", { name: "اختر إجابة واحدة" })).toBeVisible();
  }

  for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
    await page.setViewportSize(viewport);
    for (const route of [pathA, pathB]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${route} at ${viewport.width}px`).toBe(false);
    }
  }
  expect(errors).toEqual([]);
});
