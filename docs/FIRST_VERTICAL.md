# First vertical: two learning paths

## Status and purpose

This specification translates PD-001 into a reviewable first-vertical definition. It describes two separate educational products delivered through one platform:

- **Path A — Learn Arabic language using Bible passages**
- **Path B — Study the Bible in Arabic with an AI tutor**

The paths share platform infrastructure and visual language. They do not share curriculum claims, assessment scores, mastery decisions, or progress dimensions. This document defines product intent, not a validated curriculum. Named learner profiles and levels remain hypotheses until reviewed with educators and prospective learners.

## Shared platform contract

Both paths use the same foundational entities:

- **Course:** audience, instructional language, subject, outcomes, prerequisites, scope, and editorial owner.
- **Lesson:** explicit objectives, ordered activities, approved resources, practice, assessment, and completion rules.
- **Resource:** source, owner, license, translation or edition, language, canon metadata where relevant, and permitted use.
- **Tutor configuration:** allowed sources, teaching strategy, response boundaries, age policy, escalation rules, and evaluation version.
- **Progress event:** path, course, lesson, activity, skill or knowledge dimension, attempt, evidence, result, and rubric version.

Shared capabilities may include course discovery, lesson navigation, accessibility preferences, source display, contextual tutor entry points, saved position, notifications, support, and account settings. Shared infrastructure must preserve the active path in every tutor request and progress event.

## Path A — Learn Arabic language using Bible passages

### Primary learner hypothesis

An adult or older adolescent who is motivated by Bible materials and wants to improve Modern Standard Arabic reading comprehension. The learner may speak another Arabic variety, know liturgical vocabulary, or be learning Arabic as an additional language. Those are distinct profiles and must not be treated as equivalent.

### Candidate entry levels

The MVP should begin with one level after educator review. Candidate definitions:

| Level | Observable entry behavior | Out of initial scope |
| --- | --- | --- |
| Foundations | Recognizes Arabic letters and common vowel marks but reads slowly | Alphabet instruction from zero |
| Early reader | Reads short, fully vocalized sentences and recognizes basic pronouns and high-frequency words | Unvocalized literary text |
| Developing reader | Reads short paragraphs and identifies common verb and noun patterns with support | Advanced grammar and translation studies |

Placement must measure Arabic proficiency independently from Bible familiarity. Knowing a story must not raise a language score.

### Learning outcomes

Within a defined level, a learner should be able to:

- read selected, appropriately licensed Arabic text with improving accuracy and fluency;
- infer meaning using morphology, syntax, context, and a controlled glossary;
- recognize target vocabulary and grammatical patterns in new teacher-authored examples;
- sequence and summarize ideas at the learner's Arabic level;
- answer comprehension questions using evidence from the displayed source;
- reflect on confidence and choose review without penalty.

Pronunciation, listening, writing, or speaking outcomes require separate activities and evidence. Reading completion alone must not imply competence in those skills.

### Curriculum boundaries

- Bible material is an instructional resource, not evidence of Arabic proficiency by itself.
- Passage selection follows language objectives, difficulty, licensing, learner age, and curriculum review.
- Exact translation wording must come from a verified licensed or public-domain edition.
- Grammar explanations use teacher-reviewed Arabic examples and may use a support language only if the course explicitly permits it.
- Assessment measures language skills. It does not grade doctrinal agreement, devotional response, or prior Bible knowledge.
- The tutor may explain language within the approved text and glossary. It must not drift into unsourced theological instruction.

### Separate progress dimensions

- script and vowel-mark decoding;
- vocabulary recognition and use;
- morphology and grammar;
- reading comprehension;
- reading fluency when valid audio evidence exists;
- written or spoken production only when explicitly assessed.

## Path B — Study the Bible in Arabic with an AI tutor

### Primary learner hypothesis

An Arabic-reading adult or older adolescent who wants a structured introduction to Bible content in Arabic. The learner may participate independently or through an institution with an approved curriculum and interpretive context. The product must not infer affiliation, doctrine, or canon from language or geography.

### Candidate entry levels

| Level | Observable entry behavior | Out of initial scope |
| --- | --- | --- |
| Introductory | Can read accessible Arabic prose and navigate book, chapter, and verse references | Assumed prior theological vocabulary |
| Survey | Recognizes major sections and can compare nearby passages with guidance | Seminary-level historical or textual study |
| Guided study | Can distinguish observation from interpretation and support an answer with approved sources | Unbounded doctrinal debate |

Arabic reading accessibility remains a prerequisite or accommodation concern, not the subject score for this path.

### Learning outcomes

Within a defined course, a learner should be able to:

- locate a passage and identify its immediate literary context;
- recount key people, events, claims, or themes using the approved source;
- distinguish source text, historical or literary context, curriculum interpretation, and generated explanation;
- support an answer with a citation to an approved passage or course resource;
- compare related ideas without presenting speculation as source fact;
- identify uncertainty and formulate a question for an educator when the curriculum does not settle an issue.

### Curriculum boundaries

- Course authors define scope, canon, translation, interpretive framework, age suitability, and approved secondary resources.
- Assessment measures the stated knowledge and interpretation outcomes. It does not grade personal belief, worship, or religious identity.
- The tutor is an educational aid, not clergy, a confessor, a spiritual authority, or a substitute for an educator or guardian.
- Responses must distinguish direct source observations from curriculum interpretation and generated explanation.
- Denominational or institutional positions are presented only when configured, sourced, and labeled.
- Questions outside approved sources receive a bounded response and an educator-escalation option rather than invented certainty.

### Separate progress dimensions

- source navigation and context;
- narrative or discourse comprehension;
- factual recall within curriculum scope;
- theme and concept understanding;
- evidence and citation use;
- distinction between observation, interpretation, and application;
- course-specific outcomes approved by educators.

## Shared versus separate capabilities

| Capability | Shared platform behavior | Path-specific behavior |
| --- | --- | --- |
| Onboarding | Accessibility, language, device, and learning-preference settings | Separate Arabic placement and Bible-background questions |
| Course model | Course, lesson, activity, resource, prerequisites | Outcomes, scope, difficulty, curriculum owner |
| Lesson player | Navigation, source panel, activity shell, autosave | Exercise types, hints, feedback, completion rules |
| Tutor | Orchestration, citations, safety, session controls | Prompt policy, sources, teaching method, prohibited drift |
| Assessment | Attempt handling, rubric versioning, feedback delivery | Skills, knowledge dimensions, thresholds, remediation |
| Progress | Event schema, history, resume, learner controls | Independent mastery models and dashboards |
| Achievements | Accessible, non-coercive milestone system | Meaningful criteria defined by each curriculum |
| Editorial tools | Draft, review, publish, correction, audit | Subject-qualified reviewers and institutional approvals |

## MVP recommendation

Build one short, fixture-backed course per path only after curriculum and design approval. Each course should contain enough material to test the full loop—orientation, source use, practice, contextual help, assessment, feedback, and completion—without claiming a comprehensive curriculum.

The MVP should exclude live AI, authentication, payments, classrooms, voice scoring, video, social ranking, streak pressure, and persistent learner profiles. These require later evidence and safeguards.

## Assumptions requiring validation

- **A-001:** Older adolescents and adults are the initial age range. Owner input required; younger learners materially change safeguarding and consent.
- **A-002:** Modern Standard Arabic is the primary instructional register. Educator and owner input required on dialect support and liturgical vocabulary.
- **A-003:** One path will lead the first pilot while both remain first-class in architecture. Owner must choose the pilot order.
- **A-004:** Learners can read Arabic script before entering either MVP course. Placement and accessibility research required.
- **A-005:** A qualified educator will own each curriculum and review tutor behavior. Staffing and authority are unconfirmed.
- **A-006:** An institution may require a Coptic Orthodox educational context. This must be explicitly configured and reviewed; it is not assumed for every learner.
- **A-007:** Suitable Arabic Bible text can be licensed or verified as public domain for the pilot. No permission has been established.

## Owner decisions still required

1. Which path leads the first pilot?
2. What learner age band and safeguarding model apply?
3. Which Arabic proficiency band and instructional register launch first?
4. Is the first pilot independent, educator-led, or institution-led?
5. Which translation, canon, and secondary resources are permitted?
6. Which institutional interpretive context, if any, is required?
7. What evidence and threshold define successful completion for each pilot course?
