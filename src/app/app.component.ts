import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import { AppState } from './reducers';

import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public loading: boolean = true;

    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    constructor(
      private router: Router,
      private store: Store<AppState>
    ) {
      //
    }

    ngOnInit(): void {
      const userProfile = localStorage.getItem('user');

      if (userProfile !== undefined) {
          this.store.dispatch(login({user: JSON.parse(userProfile)}));
      }

      this.router.events.subscribe(event => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    this.isLoggedIn$ = this.store
      .pipe(
          select(isLoggedIn)
      );

    this.isLoggedOut$ = this.store
      .pipe(
          select(isLoggedOut)
      );
  }

  logout(): void {
      this.store.dispatch(logout());
  }
}
