import { expect, test } from "@playwright/test";

const pathA = "/learn/courses/arabic-sequence/lessons/apply-sequence";
const pathB = "/learn/courses/context-and-evidence/lessons/context-map";

test("progress presents separate paths and names its static provenance", async ({ page }) => {
  await page.goto("/learn/progress");
  await expect(page.getByRole("heading", { level: 1, name: "التقدّم والأدلة" })).toBeVisible();
  await expect(page.getByText("عرض ثابت · ليس سجل متعلّم")).toBeVisible();
  await expect(page.getByRole("heading", { name: "ملف عرض ثابت، منفصل عن جلسة الدرس" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "تعلّم العربية" })).toHaveCount(2);
  await expect(page.getByRole("heading", { level: 3, name: "دراسة الكتاب" })).toHaveCount(2);
  await expect(page.getByText(/محاولات الدروس التفاعلية مؤقتة ولا تصل إلى هنا/)).toBeVisible();
  await expect(page.getByRole("progressbar", { name: /إكمال المقرر التجريبي: 2 من 5/ })).toBeVisible();
  await expect(page.getByRole("progressbar", { name: /إكمال المقرر التجريبي: 1 من 4/ })).toBeVisible();
});

test("evidence and achievements remain traceable and uncontaminated by path", async ({ page }) => {
  await page.goto("/learn/progress");
  const evidenceGroups = page.locator('section[aria-labelledby="evidence-title"] article');
  const languageEvidence = evidenceGroups.nth(0);
  const studyEvidence = evidenceGroups.nth(1);
  await expect(languageEvidence).toContainText("lang-vocab-1");
  await expect(languageEvidence).not.toContainText("study-source-1");
  await expect(studyEvidence).toContainText("study-source-1");
  await expect(studyEvidence).not.toContainText("lang-vocab-1");

  const carefulReader = page.locator('[data-achievement-id="careful-reader"]');
  await expect(carefulReader).toContainText("حالة عرض غير ممنوحة");
  await expect(carefulReader).toContainText("المعيار الصريح");
  await expect(carefulReader).toHaveAttribute("data-evidence-ids", /study-source-1/);
  const sequenceBuilder = page.locator('[data-achievement-id="sequence-builder"]');
  await expect(sequenceBuilder).toHaveAttribute("data-evidence-ids", /lang-structure-1/);
  await expect(page.getByText(/الإكمال لا يساوي الكفاءة/)).toBeVisible();
  await expect(page.getByText(/لا سجل زمني أو شهادات/)).toBeVisible();
});

test("progress review actions and responsive navigation lead to real routes", async ({ page }) => {
  await page.goto("/learn/progress");
  await expect(page.getByRole("link", { name: /افتح درس من الفهم إلى التعبير/ })).toHaveAttribute("href", pathA);
  await expect(page.getByRole("link", { name: /افتح درس السياق والدليل/ })).toHaveAttribute("href", pathB);
  const visibleNavigation = page.viewportSize()!.width < 768 ? page.locator('[data-shell-navigation="mobile"]') : page.locator('[data-shell-navigation="rail"]');
  await expect(visibleNavigation.getByRole("link", { name: "التقدّم" })).toHaveAttribute("aria-current", "page");
  await visibleNavigation.getByRole("link", { name: "الملف والإعدادات" }).click();
  await expect(page).toHaveURL(/\/settings\/learning$/);
  await expect(page.getByRole("heading", { level: 1, name: "الملف وتفضيلات القراءة" })).toBeVisible();
});

test("temporary preferences visibly affect the preview and can be reset", async ({ page }) => {
  await page.goto("/settings/learning");
  await expect(page.getByText("ملف عرض غير مسجّل الدخول")).toBeVisible();
  await expect(page.getByText(/لا يوجد حساب حقيقي/)).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  const previewParagraph = page.getByText(/هذه فقرة أصلية لمعاينة/);
  const initialSize = await previewParagraph.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  await page.getByRole("radio", { name: "كبير جدًا" }).check();
  expect(await previewParagraph.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThan(initialSize);
  await page.getByRole("radio", { name: "أوسع" }).check();
  await page.getByRole("checkbox", { name: "تباين أوضح للمعاينة" }).check();
  await page.getByRole("checkbox", { name: "تقليل حركة المثال" }).check();
  await expect(page.getByRole("status")).toContainText("توقفت حركة المثال");
  await page.getByRole("button", { name: "إعادة الضبط" }).click();
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("radio", { name: "قياسي" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "تباين أوضح للمعاينة" })).not.toBeChecked();
});

test("preferences reset on refresh and future account controls are unavailable", async ({ page }) => {
  await page.goto("/settings/learning");
  await page.getByRole("radio", { name: "كبير جدًا" }).check();
  await page.getByRole("checkbox", { name: "تقليل حركة المثال" }).check();
  await page.reload();
  await expect(page.getByRole("radio", { name: "قياسي" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "تقليل حركة المثال" })).not.toBeChecked();
  await expect(page.getByLabel("البريد الإلكتروني")).toBeDisabled();
  await expect(page.getByLabel("كلمة المرور")).toBeDisabled();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.evaluate(() => document.cookie)).toBe("");
});

test("all deterministic tutor states disclose grounding, correction, and fallback", async ({ page }) => {
  await page.goto(pathB);
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  const selector = page.getByRole("combobox", { name: "حالة المعلّم التجريبية" });
  const panel = page.getByTestId("tutor-state-panel");
  const cases = [
    ["grounded-explanation", "شرح مرتبط بهدف النشاط"],
    ["progressive-hint", "ابدأ بأقل قدر من المساعدة"],
    ["valid-citation", "إحالة مرجعية بلا اقتباس"],
    ["insufficient-grounding", "لا تكفي البيانات للإجابة"],
    ["source-unavailable", "تعذّر عرض المصدر في هذه الحالة"],
    ["educator-review", "هذا الشرح يحتاج قرارًا من معلّم"],
    ["corrected-explanation", "سُحب شرح العرض السابق من المراجعة"],
    ["tutor-unavailable", "المعلّم السياقي غير متاح"],
    ["authored-guidance", "سمِّ طبقة كل عبارة"],
  ] as const;
  for (const [value, heading] of cases) {
    await selector.selectOption(value);
    await expect(panel).toBeFocused();
    await expect(panel).toContainText(heading);
    await expect(panel).toHaveAttribute("class", /statePanel/);
  }
  await expect(page.getByText(/كل النصوص ثابتة ومؤلَّفة مسبقًا/)).toBeVisible();
  await expect(page.getByText(/لا توجد خدمة ذكاء اصطناعي متصلة أصلًا/)).toHaveCount(0);
});

test("tutor source failure preserves mounted lesson state and authored fallback", async ({ page }) => {
  await page.goto(pathA);
  await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
  await page.getByRole("radio", { name: /عادَ/ }).check();
  const selector = page.getByRole("combobox", { name: "حالة المعلّم التجريبية" });
  await selector.selectOption("source-unavailable");
  await expect(page.getByRole("radio", { name: /عادَ/ })).toBeChecked();
  await expect(page.getByTestId("tutor-state-panel")).toContainText("تبقى إجابتك الحالية داخل ذاكرة الصفحة");
  await selector.selectOption("insufficient-grounding");
  await expect(page.getByTestId("tutor-state-panel")).toContainText("خارج الهدف اللغوي");
  await page.getByRole("button", { name: "العودة إلى إرشاد الدرس" }).click();
  await expect(page.getByTestId("tutor-state-panel")).toContainText("راقب زمن الفعل أولًا");
  await expect(page.getByRole("radio", { name: /عادَ/ })).toBeChecked();
});

test("support routes and tutor states reflow without runtime or network surprises", async ({ page }) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", (request) => { if (!request.url().startsWith("http://127.0.0.1:3000")) externalRequests.push(request.url()); });
  for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
    await page.setViewportSize(viewport);
    for (const route of ["/learn/progress", "/settings/learning", pathB]) {
      await page.goto(route);
      if (route === pathB) {
        await page.getByRole("button", { name: "ابدأ الدرس التجريبي" }).click();
        await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption("tutor-unavailable");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${route} at ${viewport.width}px`).toBe(false);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    }
  }
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});
