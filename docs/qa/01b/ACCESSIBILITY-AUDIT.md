# Mission 01B accessibility audit

## Automated result

The production-rendered route set and interactive lesson states passed axe-core 4.14.0 rules tagged `wcag2a`, `wcag2aa`, `wcag21aa`, and `wcag22aa` in Chromium. The scans covered initial pages, active lessons, feedback, tutor-unavailable states, and lesson completion. No axe violations were reported in the final run.

Automation also verified one visible main region after loading settles, Arabic `lang` and RTL direction, native radio groups and labels, accessible progress names, keyboard completion of both lessons, focus movement, visible programmatic-focus treatment, reduced-motion CSS, non-color status text, and 44 CSS pixel primary touch targets.

## Findings and fixes

1. Programmatic focus moved to feedback and tutor status regions without a dependable visible ring after pointer-originated changes. Dedicated `:focus` treatment now uses the approved focus token for activity headings, feedback, completion, and tutor states.
2. The desktop lesson grid used fixed `rem` minimums and overflowed when root text was doubled. Flexible zero-minimum center columns, smaller bounded side minimums, and wrapping action groups now preserve content without page-level horizontal scrolling.
3. A fixed mobile lesson utility could cover the lower portion of newly focused feedback. Focus targets now move to the center of the available viewport without smooth motion, and a geometry regression test prevents overlap.
4. The missing-source-metadata fallback is now a pure tested function. It withholds the citation and explicitly refuses substitution.

## WCAG 2.2 AA review status

| Area | Result | Limit |
| --- | --- | --- |
| Landmarks and headings | Automated PASS | Manual screen-reader rotor review pending |
| Names, labels, groups, validation | Automated PASS | Speech pronunciation pending |
| Keyboard operation | Automated PASS for both lessons | Manual full-site keyboard review still recommended |
| Focus management and appearance | Automated PASS after fix | High-contrast OS modes not run |
| Status/error/success semantics | Automated PASS | Announcement timing requires real AT |
| Contrast | Axe PASS on rendered states | Manual hover/forced-colors review pending |
| Target size | Automated PASS for primary lesson controls | Physical touch accuracy pending |
| Reduced motion | Automated CSS PASS | OS/device observation pending |
| Reflow and text resize | Automated PASS with documented emulation | Native browser zoom and OS large text pending |
| Reading order and bidi | DOM/automation PASS | Arabic screen-reader pronunciation pending |

## Manual verification still required

VoiceOver, TalkBack, NVDA, switch control, forced-colors mode, physical touch, native browser zoom, and Arabic pronunciation were not available. Automated axe results are not VoiceOver/TalkBack certification and do not establish complete WCAG conformance.
