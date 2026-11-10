import { expect, test } from "@playwright/test";
import { lessonFixtures } from "../lib/lesson-fixtures";
import { evaluateActivity } from "../lib/lesson-schema";
import { createLessonReducer, initialLessonState } from "../lib/lesson-state";

test("authored answer evaluation is deterministic", () => {
  const activity = lessonFixtures[0].activities[0];
  expect(evaluateActivity(activity, activity.evaluation.expectedAnswerId)).toBe("correct");
  expect(evaluateActivity(activity, "not-an-authored-answer")).toBe("incorrect");
});

test("the reducer guards submission, retry, progression, and reset transitions", () => {
  const lesson = lessonFixtures[0];
  const reducer = createLessonReducer(lesson);
  const started = reducer(initialLessonState, { type: "START" });
  expect(started.status).toBe("in-progress");

  const selected = reducer(started, { type: "SELECT_ANSWER", answerId: "returned" });
  const submitted = reducer(selected, { type: "SUBMIT" });
  expect(submitted.status).toBe("submitted");
  expect(submitted.evidence).toHaveLength(1);
  expect(reducer(submitted, { type: "SUBMIT" })).toBe(submitted);

  const secondActivity = reducer(submitted, { type: "NEXT" });
  const wrongSelection = reducer(secondActivity, { type: "SELECT_ANSWER", answerId: "because" });
  const retry = reducer(wrongSelection, { type: "SUBMIT" });
  expect(retry.status).toBe("retry-available");
  expect(retry.retryCount).toBe(1);

  const changedAnswer = reducer(retry, { type: "SELECT_ANSWER", answerId: "then" });
  expect(changedAnswer.status).toBe("answer-selected");
  expect(changedAnswer.classification).toBeNull();
  expect(reducer(changedAnswer, { type: "NEXT" })).toBe(changedAnswer);

  const reset = reducer(changedAnswer, { type: "RESET" });
  expect(reset.status).toBe("reset");
  expect(reset.evidence).toEqual([]);
  expect(reset.selectedAnswerId).toBeNull();
});
