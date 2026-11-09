import type { LearningPathId } from "./learning-paths";

export type ContentLayer = "objective" | "source-reference" | "educator-guidance";

export type LessonProvenance = {
  owner: string;
  authoredBy: string;
  reviewedBy: string;
  licenseStatus: string;
  sourceReference?: string;
};

export type InstructionalBlock = {
  id: string;
  layer: ContentLayer;
  label: string;
  title: string;
  body: string;
  provenance?: LessonProvenance;
};

export type AnswerChoice = {
  id: string;
  label: string;
  description?: string;
};

export type EvidenceDescriptor = {
  objectiveId: string;
  assessedSkill: string;
  completionMeaning: string;
  masteryCaveat: string;
};

export type LessonActivity = {
  id: string;
  type: "single-choice";
  title: string;
  prompt: string;
  instruction: string;
  choices: readonly AnswerChoice[];
  evaluation: {
    expectedAnswerId: string;
    correctHeading: string;
    correctExplanation: string;
    incorrectHeading: string;
    incorrectExplanation: string;
  };
  hints: readonly string[];
  remediation: string;
  evidence: EvidenceDescriptor;
  tutorGuidance: string;
};

export type DemoLessonDefinition = {
  schemaVersion: "1.0";
  fixtureVersion: string;
  id: string;
  courseId: string;
  pathId: LearningPathId;
  title: string;
  estimatedMinutes: number;
  objectives: readonly { id: string; text: string }[];
  blocks: readonly InstructionalBlock[];
  activities: readonly LessonActivity[];
};

export type AnswerClassification = "correct" | "incorrect";

export type SessionEvidence = {
  lessonId: string;
  lessonVersion: string;
  activityId: string;
  objectiveId: string;
  assessedSkill: string;
  answerClassification: AnswerClassification;
  hintsUsed: number;
  retryCount: number;
  completionState: "activity-submitted" | "lesson-completed";
};

export function evaluateActivity(activity: LessonActivity, answerId: string): AnswerClassification {
  return answerId === activity.evaluation.expectedAnswerId ? "correct" : "incorrect";
}

export function lessonRoute(lesson: Pick<DemoLessonDefinition, "courseId" | "id">) {
  return `/learn/courses/${lesson.courseId}/lessons/${lesson.id}`;
}
