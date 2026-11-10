# Mission 01B defect register

## Resolved findings

### QA-01B-001 — Lesson layout overflows with 200% root text

- **Severity:** P2
- **Reproduction:** Open either lesson at 1280×900; set the document root font size to 200%; inspect page scroll width.
- **Browser:** Debian Chromium 156.
- **Expected:** Instructions, controls, feedback, and tutor content reflow without main-page horizontal scrolling.
- **Actual before fix:** The fixed three-column minimums produced a 2048 px document width.
- **Root cause:** `rem`-based minimums in the header and lesson grid could exceed the viewport after text enlargement.
- **Fix:** Flexible grid minimums and wrapping action regions.
- **Regression evidence:** `responsive-rtl.spec.ts` text-resize and full-width matrix tests; final QA suite PASS.

### QA-01B-002 — Programmatically focused status regions lack visible focus

- **Severity:** P2
- **Reproduction:** Change tutor state or submit an answer, then inspect the focused status region.
- **Browser:** Debian Chromium 156.
- **Expected:** The newly focused region is visually identifiable as well as announced semantically.
- **Actual before fix:** Focus moved correctly, but pointer-originated changes did not reliably match `:focus-visible`.
- **Root cause:** Shared focus styling depended only on `:focus-visible` while these non-interactive announcement targets receive programmatic focus.
- **Fix:** Explicit approved-token focus outlines on activity, feedback, completion, and tutor targets.
- **Regression evidence:** Accessibility focus test and screenshot evidence; final axe and QA suites PASS.

### QA-01B-003 — Fixed mobile utility covers focused feedback

- **Severity:** P2
- **Reproduction:** At 390×844, start Path A, submit an incorrect answer, and inspect the newly focused feedback against the fixed lesson utility.
- **Browser:** Debian Chromium 156.
- **Expected:** All feedback and remediation remain visible when focus moves.
- **Actual before fix:** The utility crossed the lower feedback content in the captured viewport.
- **Root cause:** Programmatic focus used the browser's default nearest-edge scrolling without accounting for the fixed utility.
- **Fix:** Focus targets use `preventScroll` followed by centered, non-animated scrolling; the mobile utility has a stable test identifier.
- **Regression evidence:** Bounding-box overlap test and recaptured mobile feedback evidence.

## Harness findings closed without product changes

- Expected 404 navigation produces a Chromium console resource error. Normal-route console auditing now excludes the intentional 404; separate tests still require actual HTTP 404 responses.
- App Router loading markup can coexist briefly with the resolved main in server HTML. The audit waits for and tests the single visible main landmark rather than treating hidden transition markup as a duplicate visible landmark.

## Outstanding severity count

| Severity | Open confirmed product defects |
| --- | --- |
| P0 | 0 |
| P1 | 0 |
| P2 | 0 |
| P3 | 0 |

Firefox/WebKit, physical-device, and assistive-technology gaps are unexecuted coverage, not confirmed product defects. Any failure found there must be added with the browser/device, viewport, steps, expected result, actual result, and evidence.
