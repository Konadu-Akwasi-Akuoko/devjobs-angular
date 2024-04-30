import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import data from '../../../lib/data/data.json';
import {
  setActiveJobData,
  setActiveJobLoadingState,
  setActiveJobState,
  loadJobs,
  setJobsData,
  setJobsLoadingState,
} from './jobs.action';

// Simulate an effect of fetching data from an API
@Injectable({
  providedIn: 'root',
})
export class JobsEffectsService {
  constructor(private actions$: Actions) {}

  canLoadNext: boolean = false;

  loadJobsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadJobs),
      exhaustMap((payload) => {
        this.canLoadNext = !!data[payload.numberOfCurrentJobs + 12];
        return of(
          data
            .map((job) => ({
              id: job.id,
              company: job.company,
              logo: job.logo,
              logoBackground: job.logoBackground,
              position: job.position,
              postedAt: job.postedAt,
              contract: job.contract,
              location: job.location,
            }))
            .slice(0, payload.numberOfCurrentJobs + 12)
        ).pipe(
          map((data) => setJobsData({ jobs: data })),
          catchError(() => {
            return of(
              setJobsLoadingState({ state: 'ERROR', canLoadNext: false })
            );
          })
        );
      })
    );
  });

  setJobsDataState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setJobsData),
      filter((data) => data.jobs.length > 0),
      exhaustMap(() => {
        return of(
          setJobsLoadingState({
            state: 'SUCCESS',
            canLoadNext: this.canLoadNext,
          })
        );
      })
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
