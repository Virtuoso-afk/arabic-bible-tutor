# PD-004 component inventory

This inventory defines reusable boundaries for the approved synthesis. Components use subject-neutral names and path configuration. Mission 01A should implement the smallest required set inside the existing modular monolith.

## Foundation primitives

| Component | Responsibility | Required states |
| --- | --- | --- |
| `Button` | Primary, secondary, quiet, destructive, icon action | Default, hover, focus, pressed, disabled, loading |
| `TextLink` | Inline or standalone navigation | Default, visited where useful, focus, disabled |
| `Icon` | Decorative or labeled interface symbol | RTL direction rule, accessible-name contract |
| `TextField` / `TextArea` | Learner input and tutor question | Empty, filled, focus, error, disabled, offline draft |
| `Choice` | Radio/checkbox answer selection | Unselected, selected, correct, incorrect, disabled |
| `Badge` | Short semantic label | Neutral, path, source, status |
| `Progress` | Numeric progress with text alternative | Empty, partial, complete, indeterminate |
| `StatusMessage` | Async and system feedback | Info, success, warning, error, offline |
| `Dialog` / `Sheet` | Confirmation and mobile secondary panel | Opening, open, closing, error; focus containment |
| `Skeleton` | Stable loading placeholder | Reduced-motion and screen-reader-safe behavior |

## Product shell

| Component | Use | Responsive contract |
| --- | --- | --- |
| `BrandLockup` | Provisional identity and context subtitle | Compact mark on narrow rails; text remains in public/mobile header |
| `PublicHeader` | Landing navigation and entry action | Hide secondary links before crowding; keep identity and one action |
| `AppSidebar` | Home, courses, progress, achievements, discovery | Desktop rail; tablet icon rail; mobile bottom navigation |
| `MobileNavigation` | Four primary destinations | 44 px targets, safe-area inset, content bottom padding |
| `PageHeader` | Title, context, profile tools | Remove secondary tools before truncating title |
| `LessonHeader` | Progress, save state, exit/resume | Compact two-region mobile header; text progress remains available |
| `Breadcrumbs` | Course/module/lesson context | Wrap or collapse middle ancestors with accessible full label |

## Discovery and learning

| Component | Use | Path configuration |
| --- | --- | --- |
| `PathCard` | Explain a learning path and its outcomes | Path label, icon, accent, outcomes, entry action |
| `CourseCard` | Catalog and enrolled-course summary | Level/topic, effort, source/editorial context, availability |
| `ContinueCard` | Dominant next action | Active path, exact lesson, estimated effort, saved position |
| `CourseJourney` | Four-to-seven meaningful objectives | Station labels, status, current objective, text list equivalent |
| `LessonOutline` | Lesson steps and current position | Desktop rail; tablet/mobile sheet or compact progress control |
| `ObjectiveBlock` | Observable lesson objective | Path-specific wording and rubric association |
| `ActivityFrame` | Prompt, instructions, input, feedback, actions | Exercise renderer selected by activity type |
| `AnswerChoice` | Accessible answer option | Explanation region; selected/correct/incorrect states |
| `HintPanel` | Progressive assistance | Hint number, reveal control, optional prerequisite link |
| `FeedbackPanel` | Formative explanation | Correctness, reasoning, next action, evidence effect |
| `CompletionPanel` | Evidence summary and next lesson | Motion-reduced celebration, review items, save state |

## Source and content layers

| Component | Required data |
| --- | --- |
| `SourceReference` | Resource ID, title/reference, owner, edition/translation, license, language, version |
| `SourceQuotation` | Permitted excerpt, exact attribution, source link/reference, quotation direction/language |
| `EducatorNote` | Author/reviewer role, curriculum version, last review date |
| `InterpretationNote` | Declared curriculum/institutional context, reviewer, source basis |
| `GeneratedExplanation` | Generated label, citations, model/config version later, correction action |
| `CitationList` | Source label, locator, provenance, availability/error state |
| `ContentCorrectionNotice` | Affected version, change summary, reviewed replacement, progress impact |

Layer labels are visible text and semantic metadata. They do not depend on color or card position.

## Tutor

| Component | Responsibility |
| --- | --- |
| `TutorPanel` | Contextual assistance within the active lesson |
| `TutorScope` | Explain objective, attempt, sources, and limitations supplied to the tutor |
| `PromptStarter` | Offer a bounded, useful question |
| `TutorMessage` | Render completed response without continuous screen-reader streaming |
| `TutorCitation` | Link claims to an approved source or curriculum rule |
| `TutorLimitation` | Insufficient source, refusal, unavailable, or out-of-scope response |
| `CorrectionReport` | Preserve disputed answer and submit an editorial review request later |

## Progress and humane motivation

| Component | Rule |
| --- | --- |
| `PathProgressCard` | Shows only one path's dimensions and evidence |
| `SkillMeter` | Value plus label, scale explanation, and evidence recency |
| `WeeklyPlan` | Learner-adjustable target; missed work has neutral recovery language |
| `ReviewQueue` | Explains why each concept is due and estimated effort |
| `Achievement` | Earned from observable learning behavior; private by default |
| `EvidenceSummary` | Lists demonstrated objective, rubric state, and next review |

Do not implement currency, random rewards, public leaderboards, punitive streaks, scarcity, or engagement-pressure notifications.

## System-state compositions

- `LoadingState`
- `EmptyState`
- `OfflineState`
- `PermissionState`
- `SaveConflictState`
- `SourceUnavailableState`
- `TutorUnavailableState`
- `InsufficientGroundingState`
- `ErrorRecoveryState`
- `CompletionState`

Each composition has a heading, plain-language explanation, preserved-data statement where relevant, primary recovery action, and optional support/correction path.
