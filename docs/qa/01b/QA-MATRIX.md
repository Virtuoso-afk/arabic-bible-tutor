# Mission 01B QA matrix

**Date:** 10 November 2026

**Baseline:** `79c6c826d9c7fdbc574ca3af550804f8fb6ab11c`

**QA branch:** `mission/01b-quality-assurance`

## Environment

| Capability | Observed value | Evidence type |
| --- | --- | --- |
| Node.js | 24.22.1 | Real CLI execution |
| npm | 11.9.0 | Real CLI execution |
| Playwright | 1.65.0 | Real CLI execution |
| Chromium | Debian Chromium 156.0.8078.79 | Real browser automation |
| axe-core | 4.14.0 through `@axe-core/playwright` | Real DOM accessibility scan |
| Desktop/device access | Codex Cloud remote desktop declared but no physical mobile or assistive technology attached | Capability inspection; not device testing |

The default 84-test baseline ran before modification. The QA suite builds the application and starts `next start` itself, with `reuseExistingServer: false`, so it does not rely on a stale development server.

## Browser matrix

| Engine or product | Status | What was actually executed |
| --- | --- | --- |
| Debian Chromium 156 | PASS | Production routes, both journeys, exercise states, keyboard, axe, responsive matrix, failure injection, screenshots |
| Google Chrome | NOT RUN | Chromium execution does not certify branded Chrome |
| Microsoft Edge | NOT RUN | No Edge binary or manual environment |
| Playwright Firefox 159 | NOT RUN — BLOCKED | Official Playwright downloads returned `403 Domain forbidden` from all configured mirrors |
| Playwright WebKit 27.2 | NOT RUN — BLOCKED | Installation stopped at the same network-policy block before WebKit could download |
| Physical iOS Safari | NOT RUN | No physical iOS device |
| Physical Android Chrome | NOT RUN | No physical Android device |
| Desktop Safari | NOT RUN | Linux executor; no macOS Safari |

Playwright WebKit, if later executed, will remain an engine-level approximation and not proof of physical iOS Safari behavior.

## Automated scope

- All 14 implemented routes plus unknown path, course, and lesson parameters.
- Both complete learner paths, deterministic lesson completion, hints, incorrect/correct feedback, retry, completion, restart, and tutor states.
- Widths 320, 375, 390, 430, 768, 1024, 1440, and 1920 CSS pixels.
- Portrait and landscape layouts.
- 200% root-text stress and a 320 CSS pixel effective viewport used as the documented 1280-at-400%-zoom reflow equivalent.
- Arabic diacritics, punctuation, Arabic-Indic digits, long strings, and isolated LTR references.
- Browser Back/Forward, reload, rapid submission, offline/recovery events, console errors, external requests, and browser storage.

## Visual evidence

Seven production screenshots in `screenshots/` cover the Chromium landing and dashboard, Path A feedback, Path B tutor failure with focus, 320 px long-Arabic stress, 200% text resize, and mobile 404 recovery. Each capture audits RTL metadata, document overflow, runtime errors, and unexpected external requests. All seven were manually inspected after the final fixes; no remaining clipping, distortion, or fixed-control overlap was observed.

## Reproducible commands

```bash
npm_config_cache=/tmp/arabic-bible-tutor-npm-cache npm ci
npm run lint
npm run typecheck
CI=1 npm test
CI=1 npm run test:qa
npm run build
git diff --check
```

For evidence capture after `npm run build`:

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
node docs/qa/01b/capture-evidence.mjs
```

When the official engine binaries become available, run `npm run test:qa:browsers`. That command must not be reported as passed until Firefox and WebKit actually execute.
