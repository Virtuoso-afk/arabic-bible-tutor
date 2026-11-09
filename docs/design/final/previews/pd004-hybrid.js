const screens = ["landing", "dashboard", "lesson"];
const params = new URLSearchParams(window.location.search);
const requested = params.get("screen");
const initialScreen = screens.includes(requested) ? requested : "landing";

if (params.get("capture") === "1") document.documentElement.classList.add("capture");

function showScreen(screen) {
  document.querySelectorAll("[data-screen]").forEach((element) => {
    element.hidden = element.dataset.screen !== screen;
  });
  document.querySelectorAll("[data-target]").forEach((button) => {
    const selected = button.dataset.target === screen;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const url = new URL(window.location.href);
  url.searchParams.set("screen", screen);
  window.history.replaceState({}, "", url);
  document.title = `PD-004 — ${screen}`;
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-target]").forEach((button) => button.addEventListener("click", () => showScreen(button.dataset.target)));
document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(button.dataset.go);
}));
document.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => {
  document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
}));

const answers = [...document.querySelectorAll("[data-answer]")];
const feedback = document.querySelector(".feedback-panel");
const hint = document.querySelector(".hint-panel");
const attemptNote = document.querySelector(".attempt-note");

answers.forEach((answer) => answer.addEventListener("click", () => {
  answers.forEach((item) => item.classList.remove("selected", "correct"));
  answer.classList.add("selected");
  attemptNote.textContent = "اختيار واحد جاهز للتحقّق";
  feedback.hidden = true;
}));

document.querySelector("[data-check-answer]")?.addEventListener("click", () => {
  const selected = document.querySelector(".answer.selected");
  if (!selected) {
    attemptNote.textContent = "اختر عبارة أولًا";
    return;
  }
  if (selected.dataset.answer === "observation") {
    selected.classList.add("correct");
    feedback.hidden = false;
    attemptNote.textContent = "تم التحقّق · يمكنك المتابعة";
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    attemptNote.textContent = "ليست ملاحظة مصدرية؛ جرّب التلميح ثم أعد المحاولة";
    hint.hidden = false;
  }
});

document.querySelectorAll("[data-hint-toggle]").forEach((button) => button.addEventListener("click", () => {
  hint.hidden = !hint.hidden;
  if (!hint.hidden) hint.scrollIntoView({ behavior: "smooth", block: "nearest" });
}));
document.querySelector("[data-hint-next]")?.addEventListener("click", (event) => {
  event.currentTarget.closest(".hint-panel").querySelector("strong").textContent = "الإجابة الصحيحة تصف انتقالًا في بنية المرجع.";
  event.currentTarget.textContent = "هذا أوضح تلميح";
});

const tutorResponses = {
  hint: "ابدئي باستبعاد العبارة التي تستخدم حكمًا مطلقًا، ثم ميّزي بين كلام المصدر وملاحظة المقرر.",
  layers: "المصدر هو المادة المرخّصة؛ إرشاد المعلّم من إعداد المنهج؛ والشرح المولّد مساعدة مؤقتة يجب أن يستند إلى الاثنين.",
  source: "راجعي بطاقة «مرجع المصدر» أعلى النشاط. النص غير معروض في هذا الإثبات لعدم ادعاء ترخيص غير موثق.",
};
document.querySelectorAll("[data-prompt]").forEach((button) => button.addEventListener("click", () => {
  const output = document.querySelector(".tutor-response");
  output.textContent = tutorResponses[button.dataset.prompt];
  output.hidden = false;
}));
document.querySelector(".tutor-input")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const output = document.querySelector(".tutor-response");
  output.textContent = "هذه محاكاة تصميمية فقط. في المنتج المستقبلي سيُجاب ضمن مصادر الدرس وبإحالات قابلة للمراجعة.";
  output.hidden = false;
});
document.querySelector("[data-tutor-scroll]")?.addEventListener("click", () => document.querySelector(".tutor-panel")?.scrollIntoView({ behavior: "smooth" }));

showScreen(initialScreen);

if (params.get("state") === "review" && initialScreen === "lesson") {
  const correct = document.querySelector('[data-answer="observation"]');
  correct.classList.add("selected", "correct");
  feedback.hidden = false;
  hint.hidden = false;
  attemptNote.textContent = "تم التحقّق · يمكنك المتابعة";
}
