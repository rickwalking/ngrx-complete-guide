import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Course } from './model/course';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers/reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';
import { areCoursesLoaded } from './course/courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<any> {
  private isLoading: boolean = false;

  constructor(
    private store: Store<AppState>,
  ) {
    //
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded: boolean) => {
        if (!this.isLoading && !coursesLoaded) {
          this.isLoading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter((loaded: boolean) => loaded),
      first(),
      finalize(() => this.isLoading = false)
    );
  }
}
