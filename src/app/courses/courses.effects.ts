import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map(courses => allCoursesLoaded({ courses }))
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      concatMap((action) => this.coursesHttpService.saveCourse(
        action.course.id,
        action.course.changes
      )),
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService,
  ) {
    //
  }
}
