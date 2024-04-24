import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, of } from 'rxjs';
import data from '../../../lib/data/data.json';
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
  constructor(private actions$: Actions) {}

  loadJobsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setInitialJobsData),
      exhaustMap(() => {
        setJobsLoadingState({ state: 'LOADING' });
        return of(data).pipe(
          concatMap((data) => [
            setJobsData({ jobs: data }),
            setJobsLoadingState({ state: 'SUCCESS' }),
          ]),
          catchError(() => of(setJobsLoadingState({ state: 'ERROR' })))
        );
      })
    );
  });
}
