import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import data from '../../../lib/data/data.json';
import {
  setActiveJobData,
  setActiveJobLoadingState,
  setActiveJobState,
  setInitialJobsData,
  setJobsData,
  setJobsLoadingState,
} from './jobs.action';

// Simulate an effect of fetching data from an API
@Injectable({
  providedIn: 'root',
})
export class JobsEffectsService {
  constructor(private actions$: Actions) {}

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

  setActiveJobData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setActiveJobState),
      exhaustMap((state) => {
        if (data[state.id - 1] === undefined)
          return of(setActiveJobLoadingState({ state: 'ERROR' }));
        return of(data[state.id - 1]).pipe(
          map((data) => setActiveJobData({ data: data })),
          catchError(() => of(setActiveJobLoadingState({ state: 'ERROR' })))
        );
      })
    );
  });

  setActiveJobDataState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setActiveJobData),
      exhaustMap(() => of(setActiveJobLoadingState({ state: 'SUCCESS' })))
    );
  });
}
