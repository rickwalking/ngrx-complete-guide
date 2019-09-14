import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  INIT,
  UPDATE,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';

export const LOCAL_STORAGE_KEY = 'course-cache';

export interface AppState {
  //
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const initialState: AppState = {
  //
};

export function logger(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    let currentReducer = reducer(state, action);
    if (action.type === INIT && currentReducer) {
      currentReducer = getCachedItems();
    }

    if (action.type !== UPDATE) {
      setCachedItems(currentReducer);
    }

    if (action.type === '[Top Menu] Logout') {
      currentReducer = initialState;
      removeCachedItems();
    }

    return {...currentReducer};
  };
}

function getCachedItems(): any {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

function setCachedItems(currentReducer: any): void {
  localStorage.setItem(
    LOCAL_STORAGE_KEY, JSON.stringify(currentReducer, replacer)
  );
}

function replacer(key: string, value: any): any {
  if (key === 'auth' || key === 'router') {
    return undefined;
  }

  return value;
}

function removeCachedItems(): any {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];


