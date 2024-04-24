import { IJobsData, jobsReducer } from './jobs/jobs.reducer';
import { ITheme, themeReducer } from './theme/theme.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  theme: ITheme;
  jobsData: IJobsData;
}

export const reducers: ActionReducerMap<AppState> = {
  theme: themeReducer,
  jobsData: jobsReducer,
};
