import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setFilteredJobs } from '../jobs/jobs.action';
import { exhaustMap, of } from 'rxjs';
import { setSearchInputs } from './search-inputs.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchInputsService {
  actions$ = inject(Actions);

  setSearchInputs = createEffect(() => {
    return this.actions$.pipe(
      ofType(setFilteredJobs),
      exhaustMap((payload) => {
        return of(
          setSearchInputs({
            searchInputs: {
              titleCompanyExpertiseInput: payload.companyTitleExpertise ?? '',
              locationInput: payload.location ?? '',
              isFullTimeInput: payload.isFullTime ?? false,
            },
          })
        );
      })
    );
  });
}
