import { createAction, props } from '@ngrx/store';
import { ISearchInputs } from './search-inputs.reducer';

export const setSearchInputs = createAction(
  '[Search Inputs] Set Search Inputs',
  props<{ searchInputs: ISearchInputs }>()
);
