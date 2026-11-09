# Standalone Mission 00C previews

These dependency-free HTML previews compare three design directions. They are review artifacts, not production application code. Product-like controls inside the compositions are intentionally static; the top review toolbar switches between landing, dashboard, and lesson views.

## Open locally

From the repository root:

```bash
python3 -m http.server 4173 --directory docs/design/previews
```

Then open one of:

- `http://127.0.0.1:4173/concept-a-modern-academy.html`
- `http://127.0.0.1:4173/concept-b-learning-quest.html`
- `http://127.0.0.1:4173/concept-c-contemporary-scholar.html`

Stop the server with `Ctrl+C`.

## Recreate screenshots and layout audit

Chromium must be available at `/usr/bin/chromium`:

```bash
node docs/design/previews/capture-previews.mjs
```

The runner opens every concept and screen in 390 × 844 and 1440 × 1000 viewports, then writes a full-page PNG to `docs/design/screenshots/`. Full-page image height varies with the composition. It fails on wrong document direction, hidden/incorrect screen state, horizontal overflow, clipped visible descendants, page errors, or console errors.
