import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { IJobsData } from './jobs.reducer';

export const selectJobsData = (state: AppState) => state.jobsData;

export const selectFilteredJobs = createSelector(
  selectJobsData,
  (state: IJobsData) => state.filtrableJobs
);

export const selectActiveJobData = (state: AppState) =>
  state.jobsData.activeJobData;

export const selectActiveJobLoadingState = (state: AppState) =>
  state.jobsData.activeJobLoadingState;
