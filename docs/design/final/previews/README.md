# PD-004 hybrid design proof

This standalone proof synthesizes the approved A+B direction with selected C study patterns. It is a review artifact, not production application code. The provisional `نَسَق` identity, exact tokens, copy, and compositions remain subject to product-owner review.

From the repository root:

```bash
python3 -m http.server 4174 --directory docs/design/final/previews
```

Open `http://127.0.0.1:4174/pd004-hybrid.html`. The review toolbar switches among landing, dashboard, and lesson screens. The landing navigation, screen-entry actions, exercise selection/checking, progressive hint, and tutor prompt simulations work locally without persistence or external services.

Recreate all nine captures and run the RTL, overflow, clipping, primary-action, focus, and browser-error audit with:

```bash
node docs/design/final/previews/capture-final.mjs
```

The runner uses 390, 768, and 1440 px viewports and writes full-page PNG files to `docs/design/final/screenshots/`. Lesson captures use the deterministic feedback-and-hint review state.
