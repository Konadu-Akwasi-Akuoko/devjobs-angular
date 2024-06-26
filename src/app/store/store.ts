import { IJobsData, jobsReducer } from './jobs/jobs.reducer';
import {
  ISearchInputs,
  searchInputsReducer,
} from './search-inputs/search-inputs.reducer';
import { ITheme, themeReducer } from './theme/theme.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  theme: ITheme;
  jobsData: IJobsData;
  searchInputs: ISearchInputs;
}

export const reducers: ActionReducerMap<AppState> = {
  theme: themeReducer,
  jobsData: jobsReducer,
  searchInputs: searchInputsReducer,
};
