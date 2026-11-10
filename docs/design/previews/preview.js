const allowedScreens = ["landing", "dashboard", "lesson"];
const params = new URLSearchParams(window.location.search);
const requestedScreen = params.get("screen");
const initialScreen = allowedScreens.includes(requestedScreen) ? requestedScreen : "landing";

if (params.get("capture") === "1") {
  document.documentElement.classList.add("capture");
}

function activateScreen(screen) {
  document.querySelectorAll("[data-preview]").forEach((element) => {
    element.hidden = element.dataset.preview !== screen;
  });

  document.querySelectorAll("[data-target]").forEach((button) => {
    const selected = button.dataset.target === screen;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  document.title = `${document.body.dataset.conceptName} — ${screen}`;
}

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const screen = button.dataset.target;
    if (!allowedScreens.includes(screen)) return;
    const next = new URL(window.location.href);
    next.searchParams.set("screen", screen);
    window.history.replaceState({}, "", next);
    activateScreen(screen);
  });
});

activateScreen(initialScreen);
