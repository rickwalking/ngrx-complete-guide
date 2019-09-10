import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Course } from './model/course';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/reducers';
import { tap, first, finalize } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';

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
      tap(() => {
        if (!this.isLoading) {
          this.isLoading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(),
      finalize(() => this.isLoading = false)
    );
  }
}
