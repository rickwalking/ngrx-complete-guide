export interface Lesson {
    id: number;
    description: string;
    duration: string;
    seqNo: number;
    courseId: number;
}

export function compareLessons(
  firstLesson: Lesson,
  secondLesson: Lesson
) {
  const compareCourses = firstLesson.courseId - secondLesson.courseId;

  if (compareCourses > 0) {
    return 1;
  }

  if (compareCourses < 0) {
    return -1;
  }

  return firstLesson.seqNo - secondLesson.seqNo;
}
