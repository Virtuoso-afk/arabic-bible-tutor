# Mission 01B manual device and assistive-technology tests

All rows below are **NOT RUN** in Codex Cloud unless explicitly marked automated. No physical device or supported assistive-technology session was available.

| Environment | Status | Required setup |
| --- | --- | --- |
| iPhone Safari + VoiceOver | NOT RUN | Current supported iPhone and iOS Safari |
| Android Chrome + TalkBack | NOT RUN | Current supported Android phone and Chrome |
| Desktop Safari + VoiceOver | NOT RUN | macOS with current Safari |
| Windows browser + NVDA | NOT RUN | Windows with current NVDA and Chrome/Firefox/Edge |
| Keyboard-only desktop | Automated in Chromium; manual NOT RUN | Physical keyboard and each target desktop browser |
| Mobile orientation and touch | Simulated orientation only; physical NOT RUN | iOS and Android devices |
| OS large text and reduced motion | CSS/emulation only; physical NOT RUN | Device accessibility settings |

## Test procedure

For each environment:

1. Open landing, choose each path, enter its available course, and complete its lesson.
2. Confirm Arabic is announced in a natural reading order and LTR references remain ordered.
3. Navigate by headings, landmarks, links, form controls, and rotor/element lists.
4. Confirm radio groups expose their legend, selected state, label, and description.
5. Trigger hints, incorrect feedback, retry, correct feedback, the next activity, tutor state changes, and completion. Record every announcement and focus destination.
6. Test Back, Forward, reload, offline indication, the unavailable course, and a 404 route.
7. Rotate portrait/landscape; enable 200% text or the largest OS text; zoom to 400% where supported.
8. Confirm fixed mobile controls do not cover the focused element, instructions, feedback, or final actions.
9. Enable reduced motion and verify that no essential information depends on animation.
10. Check touch targets, pinch zoom, scrolling, input activation, and safe-area clearance.

Expected results are the same truthful contracts tested automatically: no persistence claim, no lost mounted selection during tutor/offline changes, no color-only status, no hidden required control, and separate Path A/Path B outcomes.

## Defect template

```text
ID:
Date/time and tester:
Device, OS, browser/AT versions:
Viewport/orientation/text/zoom settings:
Route and learner path:
Prerequisites:
Steps:
Expected:
Actual:
Severity (P0/P1/P2/P3):
Screenshot/video/AT speech log:
Reproducibility:
Suspected cause:
Workaround:
```
