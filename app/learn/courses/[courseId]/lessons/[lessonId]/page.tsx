import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/lesson/lesson-player";
import { getCourse } from "@/lib/learning-demo";
import { getLesson, lessonFixtures } from "@/lib/lesson-fixtures";

type LessonPageProps = { params: Promise<{ courseId: string; lessonId: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return lessonFixtures.map((lesson) => ({ courseId: lesson.courseId, lessonId: lesson.id }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const lesson = getLesson(courseId, lessonId);
  return lesson
    ? { title: `${lesson.title} — نَسَق`, description: lesson.objectives[0].text, robots: { index: false, follow: false } }
    : {};
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  const lesson = getLesson(courseId, lessonId);
  const course = getCourse(courseId);
  if (!lesson || !course) notFound();

  return <LessonPlayer courseTitle={course.title} lesson={lesson} />;
}
