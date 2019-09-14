export interface Course {
  id: number;
  seqNo: number;
  url: string;
  iconUrl: string;
  courseListIcon: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount: number;
  promo: boolean;
}

export function compareCourses(
  firstCourse: Course,
  secondCourse: Course
): number {
  const compare = firstCourse.seqNo - secondCourse.seqNo;

  if (compare > 0) {
    return 1;
  }

  if ( compare < 0) {
    return -1;
  }

  return 0;
}
