# Mission 01A-6 frontend integration and release hardening

## Route inventory

| Route | Implemented purpose | State source |
| --- | --- | --- |
| `/` | Public landing and two-path orientation | Reviewed static fixtures |
| `/learn/paths/arabic-language` | Path A definition and catalog entry | `learning-paths.ts` |
| `/learn/paths/bible-study` | Path B definition and catalog entry | `learning-paths.ts` |
| `/learn` | Demonstration learner dashboard | `learning-demo.ts` |
| `/learn/courses` | Two-path discovery and future-subject empty state | `learning-demo.ts` |
| `/learn/courses/arabic-sequence` | Available Path A course detail | Static generated fixture |
| `/learn/courses/arabic-reading-foundations` | Unavailable Path A concept | Static generated fixture |
| `/learn/courses/context-and-evidence` | Available Path B course detail | Static generated fixture |
| `/learn/courses/themes-and-structure` | Unavailable Path B concept | Static generated fixture |
| `/learn/courses/arabic-sequence/lessons/apply-sequence` | Interactive Path A lesson | Session-only reducer state |
| `/learn/courses/context-and-evidence/lessons/context-map` | Interactive Path B lesson | Session-only reducer state |
| `/learn/progress` | Static evidence provenance and private achievement examples | `learning-demo.ts` only |
| `/settings/learning` | Example identity and temporary presentation preferences | Mounted React state only |
| `/shell-preview` | Internal shared-component review surface | Static local fixture |

The root `not-found`, `loading`, and `error` conventions provide shared system states. Dynamic path, course, and lesson parameters are closed to `generateStaticParams`; unsupported identifiers return the Arabic 404 recovery instead of being rendered on demand.

## Integrated learner journeys

Both public path pages now lead directly to the matching catalog section. The verified journeys are:

```text
Landing → Path A → Path A catalog → available course → language lesson
        → hints / retry / activities → local completion → course or static progress

Landing → Path B → Path B catalog → available course → source-literacy lesson
        → hints / retry / activities → local completion → course or static progress
```

Dashboard continuation and review both open a real lesson. Catalog switching preserves explicit path ownership. Progress and settings remain reachable through desktop, tablet, and mobile navigation. Completion provides links to the course and the explicitly static progress evidence.

## Failure and recovery semantics

- **Loading:** the App Router fallback says that it prepares local UI and performs no save, sync, or AI request.
- **Unknown resource:** unsupported path, course, lesson, and arbitrary route identifiers return a styled Arabic 404 with safe catalog and home destinations.
- **Unexpected runtime error:** the error boundary offers a real boundary reset and catalog return. It does not claim work was saved.
- **Connectivity interruption:** a browser `online`/`offline` event controls a global notice. The notice explicitly says that this signal does not prove network availability or recovery. No service worker or offline-support claim exists.
- **Unavailable course:** concept fixtures remain viewable for scope review and expose no lesson-start action.
- **Missing source reference:** tutor citation presentation withholds the citation and says the fixture lacks verifiable metadata instead of substituting a source.
- **Tutor unavailable:** the mounted activity selection remains; authored lesson hints and activity controls continue.
- **Reload and history:** a full reload resets lesson and preference state. Browser history may retain mounted client state in memory, so copy promises no durable save rather than asserting every navigation destroys state.

## Current demonstration boundaries

The milestone contains no authentication, enrollment, database, browser storage, cookies, analytics, AI provider, licensed Bible passage, source retrieval, sync queue, service worker, or persistent progress. The learner identity is an explicit example. Fixture completion and evidence are demonstrations, not learner history or mastery.

Path A evaluates Arabic language behavior in original examples. Path B evaluates reference navigation, content-layer classification, and bounded reasoning. Neither path scores belief or doctrinal agreement. References are metadata only and no Bible translation is reproduced.

## Integration tests

`tests/integrated-journeys.spec.ts` traverses the complete Path A and Path B flows, dashboard destinations, progress, settings reset, tutor and connectivity failure behavior, unknown resources, reload and back behavior, keyboard navigation, responsive shell variants, runtime errors, external requests, horizontal overflow, and browser-storage boundaries.

`tests/fixture-integrity.spec.ts` validates course, path, lesson, source, activity answer, evidence, achievement, progress, and review-suggestion references. Existing reducer and route-level browser tests remain intact.

The initial focused run exposed two useful boundaries. Unknown generated parameters rendered the correct UI with HTTP 200 because streaming had begun; `dynamicParams = false` now returns 404 before rendering. The first history assertion assumed a fixed cache outcome, while the framework may preserve or remount client state; the product copy and final test now require only the truthful contract: possible in-session memory and guaranteed reset on full reload. A transient concurrent development-server JSON parse error occurred during that failing history experiment and did not recur after the test was corrected.

The first full-suite run then exposed two stale test assumptions rather than product regressions: one assertion still expected the settings copy replaced by the trust audit, and the keyboard helper could mistake a non-interactive ancestor's text for focused-link text. The assertion now checks the approved no-persistence statement, and the helper accepts only interactive focused elements. The focused rerun passed 4/4 and the final complete run passed 84/84 without retries.

## Visual evidence and discrepancy log

Production captures live in `screenshots/` and cover every requested surface plus a tablet navigation audit. The capture runner checks Arabic RTL metadata, focus visibility, primary content, overflow, runtime errors, and unexpected external requests.

| Finding | Resolution or status |
| --- | --- |
| Path-entry pages ended without a direct course action | Fixed with path-specific catalog links using existing buttons and anchors. |
| Landing copy implied actual mastery indicators and active smart assistance | Fixed to describe static evidence and contextual assistance, with the existing no-AI disclosure retained. |
| Unknown routes used Next.js default presentation and dynamic streamed 200 responses | Fixed with shared Arabic recovery UI and closed static parameters. |
| Browser-history copy implied a stronger reset guarantee than the framework provides | Fixed with explicit in-session-memory versus full-reload wording. |
| System-state screens had no shared visual treatment | Fixed with one approved-token state composition for loading, error, and not-found. |
| The implementation still uses system Arabic fonts | Unresolved pending exact font-binary and license approval; no remote font was added. |
| Full dark theme and denser source-reading layouts | Remain product-owner decisions and were not silently added. |

No approved Mission 00C-S proof, semantic palette, brand direction, dependency, or protected source content was changed.

## Accessibility findings and limitations

Automated checks cover `lang="ar"`, RTL, landmarks, heading levels on new states, native controls, keyboard navigation, visible focus, status and alert roles, reduced motion, mixed-direction references, touch targets through existing primitives, and reflow without horizontal overflow at 390, 768, and 1440 CSS pixels. The shared connectivity notice uses text rather than color alone. The error boundary does not expose exception content.

This mission does not claim manual certification with VoiceOver, NVDA, TalkBack, switch control, browser zoom at 400%, Arabic speech pronunciation, or physical mobile devices. Those checks belong in Mission 01B.

## Open production decisions

Production functionality remains blocked by learner and age-band definition, licensed source corpus, curriculum and institutional owners, qualified reviewers, evidence and mastery rules, authentication/privacy/retention design, persistence and conflict behavior, grounded-AI evaluation and provider terms, safeguarding ownership, final font files and licenses, and product-name validation.

## Prioritized Mission 01B QA checklist

1. Run manual keyboard and focus-order review across both complete journeys, including zoom and long Arabic content.
2. Test VoiceOver/Safari, NVDA/Firefox or Chrome, and TalkBack/Chrome landmarks, controls, status announcements, and Arabic pronunciation.
3. Verify 200% text resize and 400% reflow, source metadata, lesson feedback, tutor states, and fixed mobile navigation.
4. Measure all semantic color pairs and interactive states against WCAG 2.2 AA.
5. Test representative iOS, Android, tablet, and desktop browsers, safe-area insets, touch targets, back/forward cache, and orientation changes.
6. Review reduced motion, loading, 404, runtime error, offline indication, source failure, tutor failure, correction, and unavailable-course states manually.
7. Run owner-approved visual regression comparisons against Mission 00C-S at 390, 768, and 1440 px.
8. Complete educator, rights, Arabic-language, and content-layer review without treating automated checks as curriculum validation.
