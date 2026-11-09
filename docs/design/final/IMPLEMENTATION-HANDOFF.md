# Mission 01A implementation handoff

**Gate:** start only after the product owner and Maestro approve the Mission 00C-S visual result. PD-004 approves the synthesis direction, while this packet proposes its exact execution.

## Source of truth

- [Design rationale](PD-004-DESIGN-RATIONALE.md)
- [Final design system](FINAL-DESIGN-SYSTEM.md)
- [Learner experience](FINAL-LEARNER-EXPERIENCE.md)
- [Component inventory](COMPONENT-INVENTORY.md)
- [Visual review](VISUAL-REVIEW.md)
- [Standalone proof](previews/pd004-hybrid.html)

The proof represents composition, hierarchy, responsiveness, layer labeling, and interaction intent. Production code must use semantic HTML, shared React components, real 16 px minimum UI/body text, and fixture data. Do not copy proof-only tiny CSS values directly; the proof renders a complete product canvas for visual comparison.

## Exact page and route inventory

Use route groups only where they clarify public versus learner shells. Final route names may follow repository conventions, but Mission 01A should cover:

| Route | Page | Initial state source |
| --- | --- | --- |
| `/` | Landing | Static reviewed fixture |
| `/onboarding` | Path, goal, cadence, experience | Local fixture state |
| `/learn` | Learner dashboard | Fixture learner with both paths |
| `/learn/paths` | Path selection/comparison | Reviewed path fixtures |
| `/learn/courses` | Course discovery | Filterable local fixtures |
| `/learn/courses/[courseId]` | Course detail and enrollment concept | Fixture course/module data |
| `/learn/courses/[courseId]/lessons/[lessonId]` | Lesson player | Fixture lesson, activity and tutor states |
| `/learn/progress` | Separate path progress and review queue | Fixture evidence records |
| `/learn/achievements` | Private evidence-backed milestones | Fixture achievements |
| `/settings/profile` | Profile concept | Local form fixture |
| `/settings/learning` | Learning/accessibility preferences | Local form fixture |

Authentication pages may be visual fixtures if needed to connect the flow, but no real authentication or protected routing belongs in Mission 01A.

## Proposed component boundaries

```text
components/
├── ui/                    # Button, Choice, Field, Badge, Progress, Sheet, Status
├── shell/                 # PublicHeader, AppSidebar, MobileNavigation, PageHeader
├── courses/               # PathCard, CourseCard, CourseJourney, ContinueCard
├── lesson/                # LessonHeader, LessonOutline, ActivityFrame, Hint, Feedback
├── content/               # SourceReference, SourceQuotation, EducatorNote, LayerLabel
├── tutor/                 # TutorPanel, Scope, Message, Citation, Limitation
├── progress/              # PathProgressCard, SkillMeter, ReviewQueue, Achievement
└── states/                # Loading, Empty, Offline, Error, Completion
```

Keep activity behavior behind a typed `ActivityRenderer` map. Keep path terminology, accents, skill dimensions, rubrics, tutor mode, and content-layer policy in path configuration. Do not fork the entire page tree by path.

## Proposed token mapping

Add semantic custom properties to the approved token layer and map Tailwind utilities to them where helpful:

```css
--color-surface-canvas: #f3f6fa;
--color-surface-raised: #ffffff;
--color-text-primary: #11243a;
--color-text-muted: #5d6b7c;
--color-border-default: #d7e0ea;
--color-brand-navy: #0d2940;
--color-action-primary: #2d55c7;
--color-path-language: #08756e;
--color-path-study: #6c3d99;
--color-progress-milestone: #b5d743;
--color-progress-current: #f17c5c;
--color-content-source: #925f12;
--color-feedback-success: #18724d;
--color-focus-ring: #f3a712;
```

Components consume semantic names. Raw palette values stay in the theme definition. Path accent is a constrained configuration value, never arbitrary user content.

## Responsive requirements

### Mobile, 320–767 px

- One-column content; 16 px gutter; four-item bottom navigation.
- Reserve bottom padding and safe-area inset so navigation never covers the final control or focused element.
- Lesson outline opens as a sheet; tutor follows the activity or opens as a labeled sheet after usability review.
- Preserve objective, source context, layer labels, answer descriptions, and feedback. Collapse supporting metadata before removing learning context.
- No horizontal scrolling at 320 px except content whose meaning requires it and has an alternative.

### Tablet, 768–1199 px

- Compact icon rail for the learner shell.
- Dashboard side cards move below primary content in a three-card grid when space permits.
- Lesson uses one reading column followed by the tutor; an optional collapsible outline may use a sheet.
- Touch targets remain at least 44 px even with pointer input.

### Desktop, 1200 px and above

- Persistent RTL rail and two-column dashboard.
- Lesson uses outline, primary activity, and tutor columns; primary content remains the widest.
- Maximum shell 1320–1440 px and lesson prose around 760 px.

## Accessibility acceptance checks

- WCAG 2.2 AA token pairings and component states.
- Arabic `lang`/`dir`, logical CSS properties, correct DOM/focus order, and `bdi` for mixed references.
- Keyboard access to every action, visible focus, Escape/focus return for sheets/dialogs.
- 44 × 44 minimum targets, 200% text size, and 400% reflow.
- Screen-reader names, landmarks, headings, fieldsets/legends, status announcements, and progress values.
- Ordering/matching exercises have non-drag alternatives.
- Source, interpretation, educator, generated, and feedback layers have visible and programmatic labels.
- Reduced-motion behavior and no loss of information without animation.
- Answer persistence through simulated offline/save failure.

## Proof-to-screen mapping

| Production screen | Proof reference |
| --- | --- |
| Landing and path entry | `pd004-hybrid.html?screen=landing` |
| Learner dashboard, journey and dual-path progress | `pd004-hybrid.html?screen=dashboard` |
| Lesson, source layers, activity, hints, feedback and tutor | `pd004-hybrid.html?screen=lesson&state=review` |

The nine PNG captures in `docs/design/final/screenshots/` are fixed visual evidence for 390, 768, and 1440 px comparison.

## Suggested implementation order

1. **01A.1 — Foundations:** approved fonts/license evidence, semantic tokens, primitives, shell, path configuration, Storybook-equivalent local component fixtures only if the repository can support them without disproportionate cost.
2. **01A.2 — Public and onboarding:** landing, path comparison, onboarding fixtures, discovery and course detail.
3. **01A.3 — Learner home:** dashboard, journey, separate path progress, review and achievement states.
4. **01A.4 — Lesson framework:** outline, activity renderer, source layers, hints, feedback, completion, and deterministic tutor states.
5. **01A.5 — Supporting surfaces:** progress, achievements, profile/settings, loading/empty/offline/error/recovery fixtures.
6. **01B — QA:** responsive, keyboard, screen reader, contrast, reduced motion, browser/device, content and interaction review.

Each subdivision should remain reviewable and runnable. Avoid a single large redesign commit.

## Testing expectations

- Unit tests only for meaningful state transitions and configuration boundaries.
- Playwright coverage at 390, 768, and 1440 px for navigation, no overflow, path separation, lesson answer/feedback/hint behavior, tutor disclosures, and no deceptive actions.
- Automated accessibility scans plus manual keyboard and screen-reader testing.
- Visual regression baselines for the three core surfaces after owner approval.
- RTL/bidi fixtures with long Arabic, diacritics, Latin IDs, references, Arabic-Indic and Western numerals.
- Reduced-motion and offline/save-failure fixtures.

## Explicit deferrals

Mission 01A must not add a backend, database, real AI provider, authentication service, analytics, payments, licensed-source ingestion, production secrets, video, voice, or deployment. Use typed local fixtures and deterministic responses. Server-side AI, persistence, and authentication remain later gated missions.
