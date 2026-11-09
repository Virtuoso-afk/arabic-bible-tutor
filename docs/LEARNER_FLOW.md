# Learner flow

## Scope

This document describes the intended end-to-end experience for both approved learning paths. It is input to Mission 00C design exploration and later implementation; it does not approve the Mission 00A interface or imply that these features currently exist.

The MVP should demonstrate a complete learning loop with local fixtures and simulated assistance before adding authentication, persistence, or live AI.

## Shared journey map

```text
Orientation
  → choose a learning path
  → establish appropriate starting point
  → select a course
  → understand lesson objective and source
  → learn and practise
  → request contextual assistance when needed
  → complete an evidence-based check
  → receive feedback and remediation or completion
  → see path-specific progress and next step
```

At every step, the active path, course, objective, source edition, and progress dimension remain explicit.

## Entry and onboarding

### 1. Product orientation

Explain in Arabic that the platform has two distinct experiences. Each path receives a plain-language outcome statement:

- **Path A:** improve Arabic language skills through appropriately licensed Bible materials.
- **Path B:** study approved Bible curriculum in Arabic with contextual assistance.

The choice is reversible and does not merge progress. The interface avoids implying that one path is easier, more faithful, or more advanced.

### 2. Path selection

The learner chooses one path for the current session. If they ask for help choosing, show a short comparison of goals, activities, and assessment. Do not infer the choice from religious affiliation, language, location, or prior activity.

### 3. Starting-point check

Shared preferences include display density, text size, vowel-mark preference where available, audio preference, motion preference, and support-language preference.

Path-specific checks remain separate:

- Path A samples Arabic script reading, vocabulary, morphology, and comprehension appropriate to the proposed entry level.
- Path B asks about source navigation and prior course familiarity while confirming that displayed Arabic is accessible.

The MVP may use a non-scoring self-selection with transparent examples. Automated placement requires educator-approved items and validation.

### 4. Course recommendation

Show why a course is recommended, its prerequisites, duration estimate, source and curriculum owner, level, learning outcomes, and accessibility information. Learners may browse alternatives rather than accept an opaque recommendation.

## Path A flow — Learn Arabic through Bible passages

### Course discovery

Course cards emphasize Arabic skill, entry level, text support, and activity mix. The biblical source is identified but is not used as the difficulty label. Filters may include reading level, vowel marks, listening availability, skill, and estimated lesson length.

### Course detail

Show language outcomes, prerequisites, sample original exercise, source edition and rights label, skill-progress dimensions, lesson sequence, and what is not assessed. State clearly that theological agreement and prior Bible knowledge do not affect language scores.

### Lesson flow

1. **Objective preview:** one measurable Arabic skill and prior skill reminder.
2. **Source orientation:** reference, edition, license label, optional context, and accessible display controls.
3. **Noticing activity:** learner identifies a word, form, sound, or structure.
4. **Guided explanation:** concise rule, reviewed examples, and glossary support.
5. **Source-bound practice:** exercise tied to the approved passage.
6. **Transfer practice:** original non-biblical example verifies language learning beyond story familiarity.
7. **Evidence check:** a short rubric-scored activity.
8. **Feedback:** observed strengths, misconception, review option, and next step.

### Contextual tutor

The tutor opens with the current word, sentence location, language objective, and approved glossary already in context. Suggested actions are specific: “اشرح صيغة الفعل”، “أعطني تلميحًا”، or “مثال جديد”. The learner can ask freely, but the response remains within the approved language objective and source permissions.

The tutor routes theological questions to an approved Path B resource or educator rather than changing the active assessment domain.

### Progress

The dashboard shows separate evidence for reading comprehension, vocabulary, grammar or morphology, and other enabled language skills. It distinguishes lesson completion, current evidence, and later mastery. Familiarity with a passage never increases the language score without demonstrated language evidence.

## Path B flow — Study the Bible in Arabic

### Course discovery

Course cards emphasize curriculum topic, intended audience, prerequisite knowledge, canon and translation context, curriculum owner, institutional perspective when present, and activity style. Filters must not imply that one tradition is a universal default.

### Course detail

Show knowledge outcomes, scope and exclusions, active translation and canon, editorial and institutional owners, source and interpretation labels, assessment approach, and how questions outside the approved corpus are handled.

### Lesson flow

1. **Objective preview:** a clear knowledge, context, evidence, or interpretation objective.
2. **Source orientation:** active edition, reference, immediate literary context, and labeling key.
3. **Observe:** identify people, structure, actions, claims, or repeated ideas from the approved source.
4. **Context:** read a reviewed literary, historical, or institutional note with authorship.
5. **Interpret:** compare observations with the curriculum's labeled interpretation.
6. **Practise:** sequence, classify, connect, cite, or explain within the rubric.
7. **Evidence check:** answer with source references or structured reasoning.
8. **Feedback:** show source support, misconception, approved alternatives, and escalation where needed.
9. **Optional reflection:** clearly ungraded unless the curriculum defines a safe, non-belief-judging criterion.

### Contextual tutor

The tutor opens with the active passage, approved context note, curriculum perspective, and objective. Suggested actions include “أين أجد الدليل؟”، “ما الفرق بين النص والتفسير؟”, and “اشرح السياق”. Every factual or interpretive answer identifies its layer and cites approved material.

If the learner asks outside the corpus, disputes an institutional interpretation, or raises a sensitive pastoral question, the tutor states its limits and offers an educator-reviewed resource or human escalation. It does not score belief or present itself as clergy.

### Progress

The dashboard shows source navigation, context, comprehension, evidence use, observation-versus-interpretation, and curriculum-specific outcomes. Arabic reading accommodations do not become Bible-knowledge scores. Reflective responses remain private and ungraded by default.

## Practice and feedback states

Both paths use a consistent activity shell with path-specific rules:

- **Ready:** objective, expected action, source context, and available accommodations.
- **In progress:** work is locally preserved; hints remain optional and show their effect on evidence.
- **Correct with evidence:** explain what demonstrated the objective and offer transfer or continuation.
- **Partially correct:** preserve correct work, identify the missing element, and ask a focused follow-up.
- **Incorrect:** provide a clue before an answer, then route by misconception.
- **Skipped:** explain whether the activity is optional or required and how to return.
- **Needs review:** remove disputed content from mastery decisions and preserve the learner's attempt.
- **Complete:** summarize evidence and next step without exaggerated celebration.

Subtle celebrations recognize meaningful effort or mastery evidence and always allow reduced motion. Avoid random rewards, loss aversion, public rankings, manipulative streaks, or blocking progress behind decorative mechanics.

## Recovery and system states

### Loading

Show the requested object—course, source, activity, or tutor response—and preserve layout to avoid disorientation. Long operations provide status and cancellation. Skeletons must expose accessible labels rather than appearing as content.

### Offline

If a lesson is already available locally, allow approved non-AI activities and queue progress transparently. Mark tutor assistance and unavailable sources as offline. Never simulate an AI response. The learner can review what will sync and retry manually.

### Source unavailable

Stop source-dependent assessment, preserve work, identify the unavailable edition or resource, and offer a safe return or retry. Do not substitute another translation silently.

### Tutor unavailable or invalid

Keep the learner in the lesson and offer deterministic glossary, hint, source, or educator-help options. If a generated response fails citation or policy validation, withhold it rather than showing a partial unsafe answer.

### Save or sync failure

Keep a local recoverable copy when possible, show the exact unsaved scope, avoid duplicate submissions, and let the learner retry. Completion is not claimed until required evidence is saved.

### Content dispute

Allow a report, preserve the attempt, exclude the disputed item from mastery when policy requires, and explain that review is pending. Do not force the learner to repeat a potentially flawed item.

### Placement mismatch

Offer easier or harder examples and an educator or manual level change. Recommending remediation is not a penalty and does not erase valid progress.

### Session interruption

On return, show the active path, course, lesson, last completed activity, unsaved state, and available next actions. Never resume directly into microphone, media, or generated interaction without learner action.

## Completion and next step

Lesson completion shows:

- objective and evidence observed;
- items completed, skipped, or excluded;
- hints or remediation used in context;
- progress dimensions changed in the active path only;
- what remains practice versus demonstrated mastery;
- recommended review, next lesson, or educator follow-up.

Celebration is proportional and dismissible. The learner can inspect evidence and rubric details. Completion never claims language fluency, doctrinal authority, or comprehensive mastery from one lesson.

## MVP versus future functionality

| Capability | Initial MVP | Later, after approval |
| --- | --- | --- |
| Identity | Anonymous/local fixture persona | Authentication and validated roles |
| Courses | One short fixture-backed course per path | Editorially managed catalog |
| Placement | Transparent self-selection and examples | Validated adaptive placement |
| Sources | Original placeholders and rights-cleared pilot excerpts | Versioned licensed corpus and mappings |
| Tutor | Scripted or simulated contextual states | Server-side grounded AI after evaluation |
| Progress | Local, non-sensitive demonstration state | Persistent path-specific evidence and mastery |
| Feedback | Reviewed deterministic feedback | Bounded generated coaching with citations |
| Educator workflow | Documented review states | Authenticated authoring, review, correction, and audit |
| Offline | Designed states and local fixture behavior | Approved caching, sync, conflict resolution |
| Achievements | A few meaningful fixture milestones | Curriculum-defined, evaluated milestone system |
| Classrooms/social | Excluded | Separate evidence and safeguarding mission |

## Analytics and research boundaries

The MVP may record local test events needed to verify flows, without third-party analytics or real learner identity. Future research instrumentation must state the question, minimize collection, separate product telemetry from educational evidence, respect age and consent rules, and avoid optimizing for time-on-platform as a proxy for learning.

No interviews, usability sessions, placement validation, or learning outcomes have been conducted yet. Mission 00C should use this flow as a hypothesis to visualize and review, not as proof of learner demand.
