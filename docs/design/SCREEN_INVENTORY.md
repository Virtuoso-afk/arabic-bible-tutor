# Screen inventory

**Status:** Mission 00C planning artifact. “MVP” describes the smallest coherent learner experience; it does not mean these screens are implemented.

## Inventory legend

- **MVP:** needed for the first usable vertical after design approval.
- **Later:** reserved for a later mission or validation.
- **Shared:** common shell and behavior, configured per learning path.
- **Separate:** path-specific content, exercise model, rubric, or progress view.

## Public and entry screens

| Screen | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Landing | MVP, shared | Value proposition, equal introduction to both paths, learning method, source/citation promise, preview status | Loading-safe shell, reduced motion, narrow viewport |
| Path overview | MVP, separate content | Audience, outcomes, sample lesson, curriculum boundary | No course available, content under review |
| Course discovery | MVP, shared shell | Filter by active path, level/topic, effort, and availability | Empty results, loading, offline, filter reset |
| Course detail | MVP, shared shell | Outcomes, prerequisites, modules, source/editorial context, availability | Enrolled, preview-only, unavailable, update pending |
| Sign in/create account | Later implementation | Clear session purpose, privacy link, age/consent routing if needed | Validation, expired link, locked or unavailable provider |

## Onboarding

| Screen | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Welcome and path choice | MVP concept | Explain separate curricula and progress; choose A or B | Path undecided, return to comparison |
| Goal and cadence | MVP concept | Select goal, weekly rhythm, reminder preference later | Skip with sensible defaults |
| Experience profile | MVP concept, separate questions | Arabic proficiency for A; study background and goals for B | “I am not sure,” accessible explanations |
| Placement/orientation | Later | Reviewed diagnostic or orientation, transparent result | Incomplete, retry, manual starting-level change |
| Onboarding completion | MVP concept | Proposed starting point and first short action | No matching course, save failure |

## Learner home and discovery

| Screen | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Dashboard | MVP, shared shell | Continue card, active path, weekly plan, progress evidence, review queue | New learner, returning, all caught up, offline, sync problem |
| My courses | MVP | Active, saved, completed courses by path | Empty, archived, course updated |
| Path switcher | MVP | Change active learning context with explanation | Unsaved lesson attempt, first visit to other path |
| Search and filters | Later or minimal MVP | Search reviewed catalog and resources | No results, invalid query, offline |

## Lesson player

| Screen/state | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Lesson overview | MVP, shared | Objective, prerequisites, time, module position, editorial/source context | Locked prerequisite, content revision notice |
| Instruction segment | MVP, separate content | Short teaching unit with terms and approved resource references | Resource unavailable, alternate text/media |
| Source/reference layer | MVP where applicable | Citation, provenance, translation/edition metadata, permitted excerpt or reference | Citation missing, disputed interpretation label, source correction notice |
| Path A exercise | MVP, separate | Match, order, cloze, morphology, comprehension, short expression | Correct, partially correct, retry, hint, keyboard completion |
| Path B exercise | MVP, separate | Context/source mapping, claim-to-evidence, sequence, compare explanations, rubric response | Correct, incomplete evidence, alternate reviewed reading, retry |
| Contextual tutor | MVP after AI mission | Ask about current objective/attempt; cited answer; “source / interpretation / explanation” labels | Thinking, grounded answer, insufficient sources, refusal/limitation, report correction, offline |
| Hint/remediation | MVP | Progressive hint, worked example, prerequisite review | Hint exhausted, alternate modality, teacher-review flag |
| Formative check | MVP, separate rubric | Short evidence-based check for the lesson objective | Pass, developing, retry recommended, manual review later |
| Completion | MVP | Evidence summary, mastery change, review items, next lesson | Save pending, save failed, course complete |

On mobile the lesson outline and tutor are sheets with focus containment and a clear close action. On desktop they may occupy side panels, but the learning activity remains the main landmark and retains a readable line length.

## Progress and motivation

| Screen | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Progress overview | MVP, separate data | Course progress plus path-specific mastery dimensions | No evidence yet, stale sync, revised rubric |
| Review queue | MVP | Due concepts, reason for review, estimated effort | Empty, deferred item, unavailable lesson |
| Milestones | MVP, shared pattern | Meaningful achievements tied to demonstrated learning | Newly earned, previously earned, no milestones |
| Achievements collection | Later | Evidence-backed accomplishments; private by default | Hidden/private, empty |
| Activity history | Later | Attempts and corrections with learner controls | Redacted/deleted session, sync conflict |

The initial design avoids public rankings, loss-framed streaks, variable rewards, and urgency mechanics. Celebrations are brief, dismissible, and motion-reduced when requested.

## Profile, settings, and support

| Screen | Scope | Key content and actions | Required states |
| --- | --- | --- | --- |
| Profile | Later implementation | Name/display preferences, active paths | Incomplete profile |
| Learning preferences | MVP concept | Goal, cadence, explanation depth, optional transliteration policy | Reset to defaults |
| Accessibility | MVP concept | Text scale, reduced motion, contrast/theme, media alternatives | System default, unsupported preference |
| Tutor/session controls | AI mission | Clear history, report answer, explain data use | Delete pending/failed |
| Privacy and account | Auth mission | Export/delete where applicable, consent and session controls | Re-authentication, request pending |
| Help and feedback | MVP concept | Product help, content correction, technical issue | Offline draft, submitted, duplicate report |

## System states and overlays

Every applicable screen must specify:

- skeleton or progressive loading that preserves reading order;
- empty states with a useful next action;
- offline status and recoverable local work;
- timeout and retry without duplicate submissions;
- permission/session expiration;
- source unavailable or under editorial review;
- content correction notice and version change;
- AI answer with insufficient grounding;
- success, partial success, and error announced to assistive technology;
- long Arabic strings, diacritics, mixed Arabic/Latin text, and 200% text zoom;
- keyboard focus return after dialogs, sheets, and tutor panels close.

## Responsive composition rules

| Region | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Product navigation | Bottom bar, 4 destinations | Bottom bar or collapsible rail | Persistent RTL rail/sidebar |
| Course outline | Full-height sheet | Collapsible side panel | Persistent secondary panel when space permits |
| Lesson | One column, sticky progress only if it does not hide content | Main column with optional panel | Main column centered between outline and tutor |
| Tutor | Bottom sheet/full page | Resizable panel | Contextual side panel |
| Dashboard cards | One column | Two-column grid | Deliberate grid with one dominant next-action card |
| Tables/metrics | Stacked labeled rows | Responsive grid | Table where relationships require it |

## Reusable component families

- Product shell: skip link, header/rail, bottom navigation, page title, path context.
- Learning: course card, module list, lesson stepper, activity frame, answer controls, feedback block, source citation, rubric.
- Tutor: prompt starters, learner message, grounded response, citation list, limitation notice, correction report.
- Progress: mastery meter, evidence row, milestone, weekly plan, review item.
- System: button, link, input, select, tabs, dialog, sheet, toast/status, empty/loading/error panel.

Components share structure and accessibility behavior. Path-specific variants use explicit labels and restrained accents; color alone never communicates the active path.
