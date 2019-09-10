import { Course } from '../../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../../action-types';

export interface CourseState extends EntityState<Course> {
}

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,

  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, state)
  ),
);
