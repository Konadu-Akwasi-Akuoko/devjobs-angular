import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import data from '../../../lib/data/data.json';
import { AppState } from '../store';
import {
  setInitialJobsData,
  setJobsData,
  setJobsLoadingState,
} from './jobs.action';

// Simulate an effect of fetching data from an API
@Injectable({
  providedIn: 'root',
})
export class JobsEffectsService {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  loadJobsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setInitialJobsData),
      exhaustMap(() => {
        return of(data).pipe(
          map((data) => setJobsData({ jobs: data })),
          catchError(() => of(setJobsLoadingState({ state: 'ERROR' })))
        );
      })
    );
  });

  setJobsDataState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setJobsData),
      filter((data) => data.jobs.length > 0),
      exhaustMap(() => of(setJobsLoadingState({ state: 'SUCCESS' })))
    );
  });
}
