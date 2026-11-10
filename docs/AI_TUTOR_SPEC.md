# AI tutor specification

## Status

This document specifies future behavior and evaluation gates. Mission 00B does not implement an AI provider, prompt, database, or student conversation store. “Tutor” below means a bounded educational capability operating inside an approved course, not an open-ended chatbot.

## Product role

The tutor helps a learner work toward a lesson objective through questions, hints, explanations, practice, and evidence-based feedback. It must remain subordinate to the curriculum, identify its sources and limits, and make educator correction possible.

The tutor is not a curriculum author, source of scripture, clergy member, spiritual director, counselor, examiner of personal belief, or substitute for a teacher or guardian.

## Shared orchestration

A server-only tutor orchestrator should assemble a versioned **learning context envelope** for every interaction:

- learner-safe identifier and applicable age policy;
- active path, course, lesson, activity, objective, and rubric versions;
- instructional language, reading level, and accessibility preferences;
- approved source excerpts or references and their license constraints;
- curriculum-authored explanations, glossary, examples, and misconceptions;
- tutor strategy, hint ceiling, prohibited behaviors, and escalation routes;
- recent structured learning events needed for continuity;
- request purpose, such as hint, explanation, practice generation, or feedback.

The orchestrator enforces authentication, authorization, rate and cost limits, source retrieval, citation validation, moderation, structured output, logging policy, and provider abstraction. It must execute on the server. Provider credentials must never reach browser code.

## Subject-specific configurations

The shared orchestrator loads a reviewed configuration for the active path.

### Path A configuration

- optimizes for a named Arabic-language objective;
- uses the approved passage, glossary, grammar notes, and original examples;
- applies a progressive hint ladder before revealing an answer;
- evaluates language evidence independently from Bible familiarity;
- redirects theological drift to an approved Path B resource or educator;
- never creates an unofficial Bible translation to satisfy a language request.

### Path B configuration

- optimizes for a named Bible-knowledge, source-navigation, or interpretation objective;
- uses the configured canon, translation, course context, and approved secondary sources;
- labels observation, historical or literary context, curriculum interpretation, institutional position, and generated explanation;
- requests source evidence before validating a claim;
- does not infer or judge belief, affiliation, or spiritual state;
- escalates questions outside approved sources rather than producing unsupported doctrine.

Configurations are versioned and reviewed separately. Sharing a provider or orchestration service does not make their prompts, sources, rubrics, or progress interchangeable.

## Grounding and citations

### Source hierarchy

Every tutor configuration defines an ordered source set:

1. the exact licensed or verified public-domain primary edition used by the lesson;
2. curriculum-authored lesson notes and rubrics;
3. approved glossary, language reference, context notes, or institutional materials;
4. generated coaching constrained by the preceding sources.

The model's general knowledge is not an approved course source. It may help formulate language only when the output remains supported by the context envelope.

### Citation behavior

- Factual claims about displayed material cite the resource ID and human-readable location, such as book, chapter, verse range, section, or glossary entry.
- Citations are validated against retrieved source metadata before display.
- Quoted text respects the resource's permitted-use and quotation limits.
- The interface lets learners open the cited source in context.
- When sources are missing, conflicting, or insufficient, the tutor says so and offers an approved next step.
- A generated URL, verse reference, or quotation is never trusted without validation.

## Tutoring modes

Each request declares one mode so behavior and evaluation remain testable:

- **Clarify:** explain an approved concept at the learner's level.
- **Hint:** use the next step in the curriculum's hint ladder.
- **Question:** ask a purposeful check tied to the current objective.
- **Practice:** select or generate an exercise from approved templates and constraints.
- **Feedback:** compare structured learner evidence with a versioned rubric.
- **Remediate:** select a smaller prerequisite objective or alternate explanation.
- **Summarize:** recap demonstrated evidence and next steps, without inventing mastery.

Open-ended chat may be presented as a conversational interface, but every response still maps to a mode, objective, and source set.

## Practice, assessment, mastery, and remediation

- Practice items carry objective, difficulty, source, expected evidence, accepted responses, misconception tags, and review status.
- High-stakes or mastery-affecting items are educator-authored or explicitly approved. Unreviewed generated items can support practice but do not establish mastery.
- Formative feedback describes observable evidence and the relevant rule. It avoids vague praise and person-level labels.
- Completion means required lesson actions are done. Mastery requires the curriculum's threshold, transfer evidence, and often spaced evidence across sessions.
- The tutor cannot lower a threshold, mark an answer correct, or change a rubric because a learner is frustrated. It can change pacing and route to prerequisites.
- Remediation targets a recorded misconception, then returns to a new transfer item. Repeating the identical item does not count as independent evidence.
- Path A and Path B maintain separate mastery dimensions even when they reference the same passage.

## Teacher review and correction

### Review workflow

1. Curriculum author defines sources, objectives, examples, rubrics, tutor modes, and known misconceptions.
2. Subject-qualified reviewer approves the configuration and representative tutor outputs.
3. Safety and accessibility review covers age policy, harmful content, language quality, interaction, and fallback states.
4. An immutable version is released to a controlled environment.
5. Learner flags, evaluation failures, and sampled interactions enter an editorial queue.
6. A reviewer corrects content, source mapping, rubric, or tutor policy and publishes a new version with release notes.

The system preserves the affected attempt and version. Corrections do not silently rewrite historical scores. If a flawed item affected progress, a defined remediation process recalculates or invalidates that evidence and informs the learner appropriately.

### Learner reporting

Learners can flag “source mismatch,” “unclear explanation,” “possible error,” “inappropriate response,” or “other.” Reporting is accessible without requiring a free-form disclosure. The tutor acknowledges receipt without declaring its own response correct.

## Session continuity and progress

Continuity uses minimal structured state:

- active objective and lesson position;
- completed activities and valid evidence;
- misconception and hint-history tags;
- learner-selected preferences;
- remediation and next-step recommendations.

Raw conversation is not required for ordinary continuity and should not be retained by default. If later research justifies transcript storage, the product needs a defined purpose, consent or lawful basis, age policy, retention period, access controls, export/deletion behavior, and redaction strategy.

The tutor may refer to recorded learning evidence but must not claim durable memory beyond what the interface exposes. Learners must be able to start a fresh context and understand what progress remains saved.

## Safety and limitations

- Clearly identify generated assistance and provide access to cited sources.
- Do not claim divine, clerical, therapeutic, legal, medical, or safeguarding authority.
- Do not assess sincerity, faith, morality, identity, or spiritual status.
- Do not encourage secrecy, dependency, exclusivity, compulsive engagement, or emotionally coercive streak behavior.
- Do not solicit sensitive personal information to answer a lesson question.
- Apply stronger defaults for minors: age-appropriate language, restricted topics, guardian or institutional controls where legally required, limited retention, and clear human escalation.
- Route credible immediate-harm or abuse disclosures through a separately approved safeguarding flow; do not improvise crisis handling in a lesson prompt.
- Handle religious disagreement respectfully and label the configured course perspective.
- Provide a deterministic fallback when the provider is unavailable, the source cannot be loaded, or a response fails citation or safety validation.

Exact age thresholds, consent rules, and safeguarding obligations depend on launch jurisdiction and institutional context. They require legal and safeguarding review before a pilot.

## Privacy and security requirements

- Minimize personal data sent to any model provider and prohibit provider training on student content where configuration permits.
- Use server-side credentials, destination restrictions, encryption in transit and at rest, role-based access, and audit trails.
- Separate analytics identifiers from direct identity and avoid advertising profiles.
- Prevent prompt or retrieved-content injection from overriding system, safety, source, or license policy.
- Treat uploaded or retrieved content as untrusted data.
- Define deletion, export, incident response, vendor-subprocessor, data-residency, and retention policies before collecting real learner data.
- Never expose another learner's content or infer personal attributes from language performance.

## Objective evaluation

A tutor version cannot reach learners until it passes a reviewed evaluation set for its path, age band, language level, and modes.

| Dimension | Example measure | Release expectation |
| --- | --- | --- |
| Grounded accuracy | Claims supported by approved sources | Threshold set by subject reviewers; critical unsupported claims block release |
| Citation validity | Citations resolve to the claimed approved location | 100% technical resolution; sampled semantic accuracy reviewed |
| Source/interpretation labeling | Correct category on evaluation cases | No unlabeled institutional or generated interpretation |
| Pedagogical adherence | Uses objective, hint ladder, and rubric correctly | Passes educator-scored scenarios in every enabled mode |
| Path separation | Avoids theology scoring in A and language scoring in B | Zero cross-path mastery contamination |
| Arabic quality | Clarity, grammar, register, readability, and RTL presentation | Meets educator rubric for the target level |
| Uncertainty behavior | Declines or escalates unsupported questions appropriately | No fabricated source, quotation, or certainty in adversarial set |
| Safety | Handles age, sensitive, coercion, and harmful-content cases | All critical safety cases pass before release |
| Privacy | Avoids soliciting or revealing unnecessary personal data | All critical privacy cases pass before release |
| Accessibility | Feedback and tutor controls work with keyboard and assistive technology | No blocking defect in supported flows |
| Learning utility | Learner can progress after hint or remediation | Educator-scored target; requires pilot confirmation |
| Operations | Latency, availability, and cost per completed lesson | Budgets defined before live provider selection |

Numeric educational thresholds remain **TBD** until educators build the evaluation set. Production monitoring cannot replace pre-release evaluation or teacher review.

## Failure behavior

- **No approved source:** pause the answer and identify the missing resource.
- **Citation validation failure:** withhold the generated response and show a source-safe fallback.
- **Provider unavailable:** preserve learner work and offer non-AI lesson activities or retry.
- **Ambiguous rubric:** do not score; mark for educator review.
- **Content correction pending:** preserve the attempt and exclude the disputed item from mastery decisions.
- **Policy conflict:** apply the more restrictive rule and log the configuration issue for review.

## Decisions required before implementation

1. Initial age band, jurisdictions, and safeguarding owner.
2. Pilot path, course owner, and qualified reviewers.
3. Approved source corpus, translation, canon, and institutional context.
4. Transcript-retention policy and whether any free-form learner text is stored.
5. Evaluation-set ownership and release thresholds.
6. Provider procurement, data-processing terms, cost budget, and fallback strategy.
