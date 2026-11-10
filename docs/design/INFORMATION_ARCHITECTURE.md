# Information architecture

**Status:** Mission 00C proposal for product-owner review. This document does not approve a visual direction or authorize implementation.

## Architecture principles

- Start from an Arabic reading order and Arabic labels. English is optional supporting content, not the layout model.
- Keep the two initial learning paths visible and distinct:
  - **Path A:** learn Arabic through licensed biblical references.
  - **Path B:** study Bible content in Arabic with grounded tutoring.
- Share accounts, course structure, lesson delivery, tutor orchestration, and platform navigation while keeping curricula, assessment, mastery, and progress records path-specific.
- Put the learner's current lesson and next useful action ahead of catalogs, scores, or platform promotion.
- Treat the AI tutor as contextual help within a course or lesson. It must show its source context and limitations; it is not an unbounded chat destination.
- Reveal advanced educator, cohort, and administration functions only when those products exist.

## People and permissions

| Role | Initial scope | Later scope |
| --- | --- | --- |
| Visitor | Understand the two paths, inspect sample courses, choose a path | Public resources and institutional pages |
| Learner | Choose a path and level, take lessons and exercises, request contextual help, review progress | Cohorts, saved resources, collaboration, voice/video |
| Educator/reviewer | Not in the first learner MVP | Review content and AI corrections, assign work, inspect learning evidence |
| Guardian | Not in the first learner MVP | Age-appropriate consent and progress summaries where legally and pedagogically appropriate |
| Editor/admin | Offline operational process initially | Manage licensed sources, curricula, corrections, releases, and access |

Authentication is represented in the inventory, but Mission 00C does not design or implement a real identity flow.

## Proposed product map

```text
Public
├── Landing
│   ├── Path A overview
│   ├── Path B overview
│   ├── How learning works
│   └── Accessibility, source, and privacy summaries
├── Course discovery
│   ├── Path A courses
│   └── Path B courses
└── Course detail
    └── Preview / enrollment entry

Learner
├── Onboarding
│   ├── Path selection
│   ├── Goal and cadence
│   ├── Level/experience self-report
│   └── Placement or orientation (later if validated)
├── Home / dashboard
│   ├── Continue learning
│   ├── Current path and course
│   ├── Weekly plan
│   ├── Progress evidence
│   └── Recovery actions
├── Learn
│   ├── My courses
│   ├── Discover
│   ├── Course detail and enrollment
│   └── Lesson player
│       ├── Context and objective
│       ├── Source/reference layer
│       ├── Instruction
│       ├── Practice
│       ├── Contextual tutor
│       ├── Check for understanding
│       └── Completion and next step
├── Progress
│   ├── Path-specific mastery
│   ├── Course/lesson history
│   ├── Milestones
│   └── Review queue
└── Account
    ├── Profile
    ├── Learning preferences
    ├── Accessibility
    ├── Notifications (later)
    └── Privacy and session controls
```

## Navigation model

### Public experience

The public header contains the neutral product identity, **learning paths**, **how it works**, and a clearly labeled preview or sign-in entry. The landing page introduces both paths at equal hierarchy. A visitor can compare them without being forced into an account flow.

### Signed-in learner experience

The primary destinations are **Home**, **Learn**, **Progress**, and **Account**. The current path is persistent context and can be changed through a deliberate path switcher. Switching paths changes course, assessment, and progress views; it does not merge mastery scores.

| Viewport | Primary navigation | Secondary context |
| --- | --- | --- |
| Mobile, 320–767 px | Four-item bottom navigation; compact top bar for title and path | In-page tabs or a bottom sheet; tutor opens as an accessible sheet |
| Tablet, 768–1199 px | Collapsible RTL side rail or bottom navigation according to available width | Course outline in a dismissible panel |
| Desktop, 1200 px and above | Persistent RTL sidebar or compact product header | Course outline and contextual tutor may flank the lesson, with the lesson remaining the main landmark |

Navigation order follows the Arabic visual flow and a logical DOM order. Browser Back returns to the prior learner context. Deep links preserve path, course, and lesson identity.

## Core learner flows

### First visit and onboarding

1. The visitor reads the shared value proposition and compares Path A and Path B.
2. They select one path; the product explains that each path has its own curriculum and progress model.
3. They choose a learning goal and a sustainable cadence, then report relevant experience.
4. The system proposes a starting course. Any placement judgment is explained and can be changed.
5. The dashboard presents one clear next action and a short orientation lesson.

The MVP may use local demo state. Real authentication, persistence, placement algorithms, and consent flows belong to later missions.

### Returning learner

1. Home restores the last active path and lesson.
2. **Continue** shows the exact lesson and estimated effort.
3. Due review items appear as recommendations, without punitive streak language.
4. If prior state cannot load, the learner can reopen recent courses and retry safely.

### Discovery and enrollment

1. The learner enters a catalog already scoped to the active path and may inspect other paths deliberately.
2. Course detail explains outcomes, prerequisites, effort, curriculum owner, source/editorial context, and availability before enrollment.
3. Enrollment confirms the active path and the course's separate progress model. A free MVP course does not present payment language.
4. The course appears under **My courses** and its orientation or first lesson becomes the next action.
5. If enrollment fails, the page keeps the learner's place, explains whether anything was saved, and offers retry or return.

Enrollment is a conceptual state in this mission. Account persistence, capacity rules, payment, institutional assignment, and waitlists are later capabilities.

### Lesson and contextual tutor

1. The lesson opens with its objective, expected time, prerequisites, and path label.
2. Instruction and practice alternate in short sections.
3. A learner asks for a hint, explanation, or source clarification from the current activity.
4. The tutor receives the lesson objective, allowed source set, learner attempt, and age/context constraints.
5. The response separates source, interpretation, and generated explanation, cites approved sources, and offers a next action.
6. The learner retries or proceeds to a short evaluation.

### Completion and recovery

1. Completion reports evidence: objectives demonstrated, items to review, and the next lesson.
2. Progress is written to the active path only.
3. A weak result offers remediation or another explanation; it does not shame or block the learner without a pedagogical reason.
4. Offline, timeout, or save errors preserve the learner's answer locally where possible and offer retry, copy, or return actions.

## Path-specific structures

| Concern | Path A — Arabic through biblical references | Path B — Bible study in Arabic |
| --- | --- | --- |
| Curriculum spine | Language level, vocabulary, grammar, reading, listening, expression | Topic, text context, interpretation skills, source use, reflection |
| Lesson evidence | Comprehension, pronunciation/listening later, vocabulary use, grammar and expression | Source comprehension, contextual reasoning, evidence use, distinction between text and interpretation |
| Progress | Language skill dimensions and level outcomes | Study competencies, topic/course outcomes, source-literacy indicators |
| Tutor mode | Language coach grounded in the selected reference and lesson | Study tutor grounded in reviewed sources and the course's declared context |
| Exercises | Ordering, matching, cloze, morphology, comprehension, short response | Source mapping, sequence/context, claim-to-evidence, compare interpretations, reflection with rubric |

## Shared platform objects

The proposed information model uses subject-neutral objects: `learningPath`, `course`, `module`, `lesson`, `activity`, `resource`, `assessment`, `tutorSession`, `attempt`, `masteryRecord`, and `milestone`. Path configuration supplies terminology, rubrics, source rules, and mastery dimensions. This supports future subjects without weakening the separation between the initial curricula.

## Assumptions requiring confirmation

- Learners may take both paths under one account, but select one active context at a time.
- The initial audience is primarily adult or older-teen independent learners; child-specific consent and safeguarding requirements remain undecided.
- Arabic is the primary interface language; the priority and scope of English support are undecided.
- Course discovery is visible before authentication, while progress and tutoring require a learner session.
- Institutional deployments may declare a Coptic Orthodox educational context, but that context is course metadata and editorial policy, not an assumed universal doctrine.
- Placement tests, streaks, public leaderboards, guardian accounts, educator dashboards, and cohorts require later product validation.
