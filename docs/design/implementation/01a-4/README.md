# Mission 01A-4 implementation notes

## Scope delivered

Mission 01A-4 implements two complete, deterministic lesson demonstrations on the approved route shape:

- `/learn/courses/arabic-sequence/lessons/apply-sequence` — Path A language lesson;
- `/learn/courses/context-and-evidence/lessons/context-map` — Path B source-literacy lesson.

Both routes use one subject-neutral lesson player and one single-choice activity renderer. Course detail, dashboard continuation, and dashboard review actions link to implemented lessons. Concept-only courses remain unavailable.

## Authored schema

`lib/lesson-schema.ts` defines stable lesson and activity identifiers, schema and fixture versions, path/course ownership, objectives, labeled instructional blocks, answer choices, expected-answer configuration, progressive hints, explanatory feedback, remediation, evidence descriptors, and provenance. `lib/lesson-fixtures.ts` contains immutable authored content. The client state never mutates these fixtures.

The current renderer deliberately supports one useful activity type instead of proposing a universal learning-management model. Later activity types can implement the same objective, feedback, evidence, and provenance contract after educator review.

## State transitions

`lib/lesson-state.ts` implements a pure reducer with these visible states:

```text
not-started → in-progress → answer-selected → submitted → next activity
                                      └──────→ retry-available → answer-selected
last submitted activity → completed → reset → in-progress
```

- Submission is accepted only from `answer-selected`, which guards double submission.
- A changed answer clears stale classification and feedback.
- Advancement is accepted only after a correct submitted answer.
- Each activity resets selection, hints, and retry counters.
- Reset removes all temporary evidence.
- No asynchronous work exists, so there are no pending updates after unmount.

## Evaluation and evidence

Evaluation compares a stable selected-choice ID with the authored expected-answer ID. It does not call an AI model and is not an authoritative assessment record.

Each submission creates session-only evidence containing lesson/version, activity, objective, assessed skill, correct/incorrect classification, hint count, retry count, and completion state. It stores no identity and no free-text response. Lesson completion and skill mastery remain separate: completion means the local activity sequence ended, while every evidence descriptor states that one session does not establish mastery.

Evidence is held only in React reducer state. It is not sent to the dashboard fixtures, browser storage, cookies, a server, or a database. Refresh, navigation away, and restart clear it.

## Contextual guidance

The contextual-teacher region displays guidance authored with the active activity. It can reveal the same progressive hint or link to the lesson’s source and educator layers. The region states that AI is disconnected and that there is no live conversation. It has no prompt field, generated response, API call, or simulated chat.

## Content safeguards

- Path A assesses Arabic past-tense recognition, sequencing markers, and reading order through original Arabic examples.
- Path B assesses reference navigation, observation-versus-interpretation classification, and bounded evidence reasoning.
- Biblical references are metadata only. No translation text is reproduced and no reuse right is claimed.
- Source reference, educator rule, and lesson feedback carry explicit visible labels.
- Path B never scores belief, identity, devotion, or doctrinal agreement.

## Accessibility and responsive behavior

The player uses a fieldset and native radio inputs, a labeled native progress element, status announcements, focusable feedback and completion regions, a skip link, keyboard-operable controls, visible focus, mixed-language `bdi`, and text labels alongside correctness color. Focus moves to new activity prompts, feedback, and completion. Controls retain at least 44 px targets.

The desktop composition follows the approved outline/content/contextual-guidance columns. Tablet uses a compact outline rail with guidance below the reading surface. Mobile stacks all learning context, keeps visible lesson progress, and provides a bottom hint/guidance utility bar. Reduced-motion CSS removes component transitions; scripted tutor scrolling respects the browser’s reduced-motion preference through the capture context.

## Deliberate proof adaptations

- The proof’s generated tutor simulation became a smaller authored-guidance region because Mission 01A-4 prohibits fake AI conversation. This is a scope correction and does not need owner approval.
- Source cards show reference and provenance metadata without the proof’s protected passage text.
- The proof demonstrated one Path B question; production provides three coherent activities for each path and a completion summary.
- Correctness is revealed only after explicit submission. A selected choice is not pre-marked correct.
- Save language was replaced with session-only disclosure because persistence is out of scope.
- The lesson header and controls use production 16 px body sizing instead of proof-scale canvas typography.

## Capture

Build and run the production application, then execute:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
node docs/design/implementation/01a-4/capture-lessons.mjs
```

The script captures active Path A and Path B lessons at mobile and desktop widths, plus tablet, hint, incorrect-feedback, and completion states. It audits Arabic RTL metadata, primary content, horizontal overflow, runtime errors, and focus visibility.

## Deferred work

Real AI tutoring, live chat, persistence, authentication, licensed corpus ingestion, teacher workflows, free-text grading, production mastery, and dashboard evidence integration remain deferred. Educator review of examples, assessment validity, curriculum level, and source policy is still required.
