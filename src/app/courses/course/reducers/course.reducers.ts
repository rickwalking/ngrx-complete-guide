import { Course, compareCourses } from '../../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../../action-types';

export interface CoursesState extends EntityState<Course> {
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCourseState = adapter.getInitialState();

export const courseReducer = createReducer(
  initialCourseState,

  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, state)
  ),
);

export const {
  selectAll,
} = adapter.getSelectors();
