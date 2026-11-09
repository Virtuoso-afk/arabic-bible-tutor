# Content policy

## Purpose and scope

This policy governs source text, translations, curriculum notes, exercises, media, citations, institutional interpretations, and generated explanations used by the platform. It applies to both initial learning paths and future subjects.

The policy is an engineering and editorial baseline, not legal advice. No content may be described as licensed, public domain, doctrinally approved, or safe for a specific age group without recorded evidence from the responsible reviewer.

## Admission rule

A resource may enter a learner-facing course only when it has:

1. an identified source and owner or responsible publisher;
2. a verified rights basis for the intended use;
3. a stable edition or version;
4. defined permitted uses and restrictions;
5. subject-qualified editorial approval;
6. age, language, accessibility, and institutional metadata where applicable.

Unknown ownership, unclear website terms, common online availability, or model familiarity do not establish permission.

## Licensing and attribution

### Accepted rights bases

- original material created for the platform under a written agreement;
- written permission or a license covering the intended storage, display, adaptation, quotation, audio, AI-processing, and distribution uses;
- an open license whose attribution, share-alike, noncommercial, no-derivatives, and version terms are compatible with the product use;
- verified public-domain material in every relevant jurisdiction, with the specific edition and translation checked separately.

### Required attribution record

Every published resource stores the title, author or organization, translator and edition where relevant, publisher, publication date, source location, rights holder, license identifier or permission record, attribution text, modification status, territory or term limits, permitted media, and reviewer.

Attribution must appear where the license requires and remain attached in exports, citations, and derived assets. A license permitting text display does not automatically permit audio synthesis, translation, adaptation, model training, embedding, or bulk distribution.

## Source provenance

Each resource receives a stable internal ID and provenance chain:

- acquisition source and date;
- checksum or version identifier for the received artifact;
- transcription, normalization, segmentation, or formatting steps;
- human and automated transformations;
- links from excerpts to the parent edition and location;
- reviewers, approvals, corrections, and publication history;
- withdrawal, expiration, or dispute status.

Generated content records the model and policy version, input source IDs, creation time, review status, and whether it can affect assessment. Generated text is never promoted to an authoritative source merely because an editor retained it.

## Bible translation and canon considerations

- A Bible work's ancient source status does not determine the copyright status of a modern Arabic translation, commentary, formatting, audio recording, or digital edition.
- Store translation name, language register, edition, publisher, rights status, and exact book/chapter/verse mapping.
- Store the configured canon or collection explicitly. Do not assume all traditions use identical book lists, naming, ordering, numbering, or verse boundaries.
- Cross-translation or cross-canon links require reviewed mappings and must show the learner which edition is active.
- The tutor cites the active edition and must not blend wording from multiple translations into an unlabeled synthetic passage.
- Machine-generated translation of protected source text is not a workaround for licensing and is not an approved scripture edition.

## Institutional and Coptic Orthodox context

A Coptic Orthodox educational context is a possible institutional requirement for a future course or pilot. It is not an unverified universal doctrine and must not become the platform-wide default by assumption.

When required, an institutional course profile must identify:

- the commissioning or approving institution;
- the applicable canon, translation, curriculum, and secondary sources;
- the qualified doctrinal and educational reviewers;
- terminology, feast, liturgical, patristic, or interpretive guidance within scope;
- how the perspective is labeled to learners;
- questions that require clergy or educator escalation;
- version, approval date, and correction contact.

The interface must distinguish “this course presents the approved Coptic Orthodox perspective” from “all Christians interpret this identically.” Comparative material requires approved sources and fair labeling.

## Content-layer labels

Learners must be able to distinguish these layers:

1. **Source text:** exact content from the identified approved edition, visually protected from silent rewriting.
2. **Source metadata:** edition, translation, canon, authorship or publisher data, reference, and license information.
3. **Editorial context:** reviewed historical, literary, language, or curriculum notes with an identified author or organization.
4. **Interpretation:** a labeled curriculum or institutional explanation supported by approved sources.
5. **Generated explanation:** temporary AI assistance derived from approved context, labeled as generated and subject to error.
6. **Learner reflection:** the learner's own response, not source fact and not automatically assessed.

The system must not present generated explanation in the typography or citation treatment reserved for source text.

## Editorial workflow

### Roles

- **Rights reviewer:** confirms the permission basis and attribution obligations.
- **Curriculum author:** defines learning purpose, selection, activities, and assessments.
- **Subject reviewer:** checks factual, linguistic, biblical, historical, or theological accuracy as applicable.
- **Institutional approver:** approves a configured perspective when an institution requires it.
- **Accessibility reviewer:** checks reading level, alternatives, structure, and assistive-technology needs.
- **Publisher:** releases a version after required approvals; one person may hold multiple roles only when governance permits it.

### States

`draft → rights cleared → subject reviewed → accessibility reviewed → approved → published → corrected/withdrawn`

Content cannot skip rights clearance. AI-generated drafts cannot self-approve. Published content is immutable by version; corrections create a new version and preserve the audit trail.

## Error reporting and correction

- Learners and educators can flag a source mismatch, attribution issue, factual or doctrinal concern, translation issue, broken citation, accessibility problem, or inappropriate generated explanation.
- Reports preserve the content, source, curriculum, and tutor versions involved without exposing another learner's data.
- Triage distinguishes urgent safety or rights issues from ordinary editorial clarification.
- A disputed assessment item is suspended from new mastery decisions when the review owner determines the concern is credible.
- Corrections identify what changed, who approved it, and whether past progress needs recalculation or notification.
- Rights-holder withdrawal or credible infringement claims can unpublish the affected asset and dependent generated material while review proceeds.

The product must not promise that every disagreement will change curriculum content. It must provide a traceable review and response process.

## Scraping, ingestion, and reuse restrictions

- Do not bulk scrape websites, apps, PDFs, repositories, or media libraries unless written terms and technical authorization permit the exact use.
- Do not evade access controls, rate limits, robots rules, paywalls, geographic restrictions, or copy protection.
- Do not treat search snippets, user uploads, social posts, or model output as licensed source material.
- Do not ingest a full translation because a small quotation might be permitted.
- Do not use protected course or learner content for model training, fine-tuning, embeddings, or evaluation without an approved rights and privacy basis.
- Do not republish a source's structure, annotations, audio, typography, or metadata when permission covers only text excerpts.
- Respect deletion, expiration, attribution, noncommercial, no-derivatives, and share-alike obligations throughout caches, backups, exports, and derived datasets.

Automated ingestion may assist an authorized workflow, but every resource still needs provenance, rights status, and editorial approval before learner use.

## AI content restrictions

- The tutor retrieves only content approved for the learner, course, purpose, and provider-processing terms.
- Prompts and outputs do not replace a missing content license.
- Generated quotations and citations are validated before display.
- Generated practice affecting mastery requires educator approval or a separately approved constrained-generation and validation process.
- The tutor does not merge institutional interpretation into source text or present a configured doctrine as universal.
- Provider retention and training settings must meet the platform's approved privacy and rights requirements.

## Minimum resource record

Before implementation, define a schema covering:

```text
resource_id, title, resource_type, language, edition,
owner, publisher, translator, source_location, checksum,
rights_basis, license_id, permission_record, attribution_text,
permitted_uses, prohibited_uses, territory, expiry,
canon_profile, institutional_profile, age_rating,
curriculum_owner, reviewer_ids, review_status, version,
parent_resource_id, transformation_log, published_at, withdrawn_at
```

The final schema and retention rules require legal, editorial, security, and data-governance review.

## Open approvals

1. Rights counsel or accountable rights reviewer.
2. Initial Arabic Bible edition and permitted uses.
3. Canon and institutional profiles for the first pilot.
4. Qualified language, Bible, and institutional reviewers.
5. Quotation, audio, adaptation, and AI-processing limits.
6. Correction response times, learner notification rules, and withdrawal authority.
