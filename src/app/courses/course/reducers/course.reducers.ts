import { Course, compareCourses } from '../../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../../action-types';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCourseState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const courseReducer = createReducer(
  initialCourseState,

  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(
      action.courses,
      {...state, allCoursesLoaded: true,
      })
  ),

  on(CourseActions.courseUpdated,
    (state, action) => adapter.updateOne(action.course, state)
  ),
);

export const {
  selectAll,
} = adapter.getSelectors();
