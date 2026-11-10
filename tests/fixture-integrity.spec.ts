import { expect, test } from "@playwright/test";
import { achievements, courses, evidenceRecords, pathProgress, reviewSuggestions } from "@/lib/learning-demo";
import { learningPathIds } from "@/lib/learning-paths";
import { getLesson, lessonFixtures } from "@/lib/lesson-fixtures";
import { getTutorStateContent } from "@/lib/tutor-states";

test("all fixture relationships and assessment references resolve", () => {
  expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length);
  expect(new Set(evidenceRecords.map((record) => record.id)).size).toBe(evidenceRecords.length);
  expect(new Set(lessonFixtures.map((lesson) => `${lesson.courseId}/${lesson.id}`)).size).toBe(lessonFixtures.length);

  for (const course of courses) {
    expect(learningPathIds).toContain(course.pathId);
    const interactiveLessons = lessonFixtures.filter((lesson) => lesson.courseId === course.id);
    expect(interactiveLessons.length, course.id).toBe(course.status === "demo" ? 1 : 0);
  }

  for (const lesson of lessonFixtures) {
    const course = courses.find((item) => item.id === lesson.courseId);
    expect(course, lesson.courseId).toBeDefined();
    expect(course?.pathId).toBe(lesson.pathId);
    expect(course?.lessons.some((item) => item.id === lesson.id)).toBe(true);
    expect(lesson.blocks.some((block) => block.layer === "source-reference")).toBe(true);
    expect(lesson.blocks.some((block) => block.layer === "educator-guidance")).toBe(true);
    const source = lesson.blocks.find((block) => block.layer === "source-reference");
    expect(source?.provenance?.sourceReference).toBeTruthy();
    for (const activity of lesson.activities) {
      expect(activity.choices.some((choice) => choice.id === activity.evaluation.expectedAnswerId), activity.id).toBe(true);
      expect(activity.hints.length, activity.id).toBeGreaterThan(0);
    }
  }

  for (const progress of pathProgress) {
    const course = courses.find((item) => item.id === progress.courseId);
    expect(course?.pathId).toBe(progress.pathId);
    for (const skill of progress.skills) {
      for (const evidenceId of skill.evidenceIds) {
        expect(evidenceRecords.find((record) => record.id === evidenceId)?.pathId).toBe(progress.pathId);
      }
    }
  }

  for (const achievement of achievements) {
    for (const evidenceId of achievement.evidenceIds) {
      expect(evidenceRecords.find((record) => record.id === evidenceId)?.pathId).toBe(achievement.pathId);
    }
  }

  for (const suggestion of reviewSuggestions) {
    expect(getLesson(suggestion.courseId, suggestion.lessonId)).toBeDefined();
  }
});

test("missing source metadata withholds a citation without substituting content", () => {
  const lesson = lessonFixtures[0];
  const activity = lesson.activities[0];
  const guidance = lesson.blocks.find((block) => block.layer === "educator-guidance")!;
  const source = { ...lesson.blocks.find((block) => block.layer === "source-reference")!, provenance: undefined };
  const content = getTutorStateContent("valid-citation", activity, guidance, lesson.pathId, source);
  expect(content.title).toBe("بيانات المرجع غير متاحة");
  expect(content.body).toContain("لا يحتوي على معرّف مصدر قابل للتحقق");
  expect(content.detail).toContain("لم يُستبدل المرجع بمصدر آخر");
});
