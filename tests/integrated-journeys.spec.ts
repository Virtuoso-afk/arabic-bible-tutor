import { expect, test, type Page } from "@playwright/test";

const answers = {
  language: ["عادَ", "ثمَّ", "نزل المسافرون"],
  study: ["٢٥–٣٧", "تذكر بطاقة المصدر", "وفق قاعدة المقرر"],
};

async function completeLesson(page: Page, lessonAnswers: string[]) {
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  for (const [index, label] of lessonAnswers.entries()) {
    await page.getByRole("radio", { name: new RegExp(label) }).check();
    await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
    await page.getByRole("button", { name: index === lessonAnswers.length - 1 ? "اعرض ملخص الإكمال" : "النشاط التالي" }).click();
  }
}

async function tabTo(page: Page, accessibleName: string) {
  for (let index = 0; index < 30; index += 1) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => ({
      name: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim() ?? "",
      tag: document.activeElement?.tagName ?? "",
    }));
    if (["A", "BUTTON", "INPUT", "SELECT"].includes(focused.tag) && focused.name.includes(accessibleName)) return;
  }
  throw new Error(`Keyboard focus did not reach ${accessibleName}`);
}

test("landing to Path A course and completed language lesson is one honest journey", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "استكشف تعلّم العربية" }).click();
  await page.getByRole("link", { name: "استكشف مقررات تعلّم العربية" }).click();
  await expect(page).toHaveURL(/\/learn\/courses#path-a$/);
  await page.getByRole("link", { name: "عرض تفاصيل مقرر من الفهم إلى التعبير" }).click();
  await page.getByRole("link", { name: "ابدأ الدرس التفاعلي" }).click();
  await completeLesson(page, answers.language);
  await expect(page.getByTestId("completion-panel")).toContainText("لا يعني إتقانًا أو تقدّمًا محفوظًا");
  await expect(page.getByRole("link", { name: "راجع أدلة العرض الثابتة" })).toHaveAttribute("href", "/learn/progress");
});

test("landing to Path B course and completed source-literacy lesson stays distinct", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "استكشف دراسة الكتاب" }).click();
  await page.getByRole("link", { name: "استكشف مقررات دراسة الكتاب" }).click();
  await expect(page).toHaveURL(/\/learn\/courses#path-b$/);
  await page.getByRole("link", { name: "عرض تفاصيل مقرر السياق والدليل" }).click();
  await page.getByRole("link", { name: "ابدأ الدرس التفاعلي" }).click();
  await completeLesson(page, answers.study);
  await expect(page.getByTestId("completion-panel")).toContainText("الاستدلال المسند");
  await expect(page.getByTestId("completion-panel")).not.toContainText("استخدام روابط التسلسل");
});

test("dashboard continuation, review, progress, and settings destinations remain real", async ({ page }) => {
  await page.goto("/learn");
  await page.getByRole("link", { name: /ابدأ الدرس التفاعلي/ }).click();
  await expect(page).toHaveURL(/\/lessons\/apply-sequence$/);
  await page.getByRole("link", { name: "نَسَق، لوحة المتعلّم" }).click();
  await page.getByRole("link", { name: "افتح تمرين المراجعة" }).click();
  await expect(page).toHaveURL(/\/lessons\/apply-sequence$/);
  await page.goto("/learn/progress");
  await expect(page.getByText("عرض ثابت · ليس سجل متعلّم")).toBeVisible();
  await page.goto("/settings/learning");
  await page.getByRole("radio", { name: "كبير جدًا" }).check();
  await page.reload();
  await expect(page.getByRole("radio", { name: "قياسي" })).toBeChecked();
});

test("unknown routes use the accessible not-found recovery and concepts stay unavailable", async ({ page }) => {
  for (const route of ["/learn/courses/unknown-course", "/learn/courses/arabic-sequence/lessons/unknown-lesson", "/unknown-route"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "لم نجد هذه الصفحة" })).toBeVisible();
    await expect(page.getByRole("link", { name: "استكشف المقررات المتاحة" })).toHaveAttribute("href", "/learn/courses");
  }
  await page.goto("/learn/courses/arabic-reading-foundations");
  await expect(page.getByText("تصور مفاهيمي غير متاح")).toBeVisible();
  await expect(page.getByRole("link", { name: "ابدأ الدرس التفاعلي" })).toHaveCount(0);
});

test("offline and tutor-unavailable notices preserve only mounted activity state", async ({ page, context }) => {
  await page.goto("/learn/courses/context-and-evidence/lessons/context-map");
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  const answer = page.getByRole("radio", { name: /٢٥–٣٧/ });
  await answer.check();
  await context.setOffline(true);
  await expect(page.getByText("يشير المتصفح إلى انقطاع الاتصال")).toBeVisible();
  await expect(answer).toBeChecked();
  await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption("tutor-unavailable");
  await expect(page.getByTestId("tutor-state-panel")).toContainText("لا توجد خدمة ذكاء اصطناعي متصلة أصلًا");
  await expect(answer).toBeChecked();
  await context.setOffline(false);
  await expect(page.getByText("يشير المتصفح إلى انقطاع الاتصال")).toHaveCount(0);
});

test("browser back and lesson reload remain honest about session-only state", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "استكشف تعلّم العربية" }).click();
  await expect(page).toHaveURL(/\/learn\/paths\/arabic-language$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1, name: /تقدّمٌ له معنى/ })).toBeVisible();

  await page.goto("/learn/courses/arabic-sequence/lessons/apply-sequence");
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  await page.getByRole("radio", { name: /عادَ/ }).check();
  await page.reload();
  await expect(page.getByRole("button", { name: "ابدأ الدرس التجريبي" })).toBeVisible();
  await expect(page.getByText(/كل الأدلة تبقى داخل هذه الصفحة حتى تحديثها/)).toBeVisible();
});

test("a keyboard journey reaches a path and its catalog without pointer input", async ({ page }) => {
  await page.goto("/");
  await tabTo(page, "استكشف تعلّم العربية");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/learn\/paths\/arabic-language$/);
  await tabTo(page, "استكشف مقررات تعلّم العربية");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/learn\/courses#path-a$/);
});

test("integrated routes keep responsive navigation, RTL, storage, runtime, and network boundaries", async ({ page }) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", (request) => { if (!request.url().startsWith("http://127.0.0.1:3000")) externalRequests.push(request.url()); });

  for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
    await page.setViewportSize(viewport);
    for (const route of ["/", "/learn", "/learn/courses", "/learn/courses/arabic-sequence", "/learn/progress", "/settings/learning"]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${route} at ${viewport.width}px`).toBe(false);
    }
    await page.goto("/learn");
    const rail = page.locator('[data-shell-navigation="rail"]');
    const mobile = page.locator('[data-shell-navigation="mobile"]');
    await expect(viewport.width < 768 ? mobile : rail).toBeVisible();
    await expect(viewport.width < 768 ? rail : mobile).toBeHidden();
  }

  expect(await page.evaluate(() => ({ cookies: document.cookie, local: localStorage.length, session: sessionStorage.length }))).toEqual({ cookies: "", local: 0, session: 0 });
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});
