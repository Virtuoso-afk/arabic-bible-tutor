import type { DemoLessonDefinition, SessionEvidence } from "./lesson-schema";
import { evaluateActivity } from "./lesson-schema";

export type LessonStatus =
  | "not-started"
  | "in-progress"
  | "answer-selected"
  | "submitted"
  | "retry-available"
  | "completed"
  | "reset";

export type LessonSessionState = {
  status: LessonStatus;
  currentActivityIndex: number;
  selectedAnswerId: string | null;
  classification: "correct" | "incorrect" | null;
  hintCount: number;
  retryCount: number;
  evidence: readonly SessionEvidence[];
};

export type LessonAction =
  | { type: "START" }
  | { type: "SELECT_ANSWER"; answerId: string }
  | { type: "REVEAL_HINT"; hintTotal: number }
  | { type: "SUBMIT" }
  | { type: "NEXT" }
  | { type: "RESET" };

export const initialLessonState: LessonSessionState = {
  status: "not-started",
  currentActivityIndex: 0,
  selectedAnswerId: null,
  classification: null,
  hintCount: 0,
  retryCount: 0,
  evidence: [],
};

export function createLessonReducer(lesson: DemoLessonDefinition) {
  return function lessonReducer(state: LessonSessionState, action: LessonAction): LessonSessionState {
    const activity = lesson.activities[state.currentActivityIndex];

    switch (action.type) {
      case "START":
        if (state.status !== "not-started" && state.status !== "reset") return state;
        return { ...initialLessonState, status: "in-progress" };
      case "SELECT_ANSWER":
        if (state.status === "completed" || (state.status === "submitted" && state.classification === "correct")) return state;
        return {
          ...state,
          status: "answer-selected",
          selectedAnswerId: action.answerId,
          classification: null,
        };
      case "REVEAL_HINT":
        if (state.status === "not-started" || state.status === "completed") return state;
        return { ...state, hintCount: Math.min(state.hintCount + 1, action.hintTotal) };
      case "SUBMIT": {
        if (state.status !== "answer-selected" || !state.selectedAnswerId) return state;
        const classification = evaluateActivity(activity, state.selectedAnswerId);
        const nextRetryCount = state.retryCount + (classification === "incorrect" ? 1 : 0);
        const evidence: SessionEvidence = {
          lessonId: lesson.id,
          lessonVersion: lesson.fixtureVersion,
          activityId: activity.id,
          objectiveId: activity.evidence.objectiveId,
          assessedSkill: activity.evidence.assessedSkill,
          answerClassification: classification,
          hintsUsed: state.hintCount,
          retryCount: nextRetryCount,
          completionState: "activity-submitted",
        };
        return {
          ...state,
          status: classification === "correct" ? "submitted" : "retry-available",
          classification,
          retryCount: nextRetryCount,
          evidence: [...state.evidence, evidence],
        };
      }
      case "NEXT": {
        if (state.status !== "submitted" || state.classification !== "correct") return state;
        const isLastActivity = state.currentActivityIndex === lesson.activities.length - 1;
        if (isLastActivity) {
          const evidence = state.evidence.map((record, index) =>
            index === state.evidence.length - 1 ? { ...record, completionState: "lesson-completed" as const } : record,
          );
          return { ...state, status: "completed", evidence };
        }
        return {
          ...state,
          status: "in-progress",
          currentActivityIndex: state.currentActivityIndex + 1,
          selectedAnswerId: null,
          classification: null,
          hintCount: 0,
          retryCount: 0,
        };
      }
      case "RESET":
        return { ...initialLessonState, status: "reset" };
      default:
        return state;
    }
  };
}
