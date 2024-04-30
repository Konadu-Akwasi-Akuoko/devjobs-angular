import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { IJobsData } from './jobs.reducer';

export const selectJobsData = (state: AppState) => state.jobsData;

export const selectOnlyJobs = createSelector(
  selectJobsData,
  (state: IJobsData) => state.jobs
);

export const selectNumberOfCurrentJobs = (state: AppState) =>
  state.jobsData.numberOfCurrentJobs;

export const selectCanLoadNextJob = (state: AppState) =>
  state.jobsData.canLoadNextData;

export const selectFilteredJobs = createSelector(
  selectJobsData,
  (state: IJobsData) => state.filtrableJobs
);

export const selectActiveJobData = (state: AppState) =>
  state.jobsData.activeJobData;

export const selectActiveJobLoadingState = (state: AppState) =>
  state.jobsData.activeJobLoadingState;

export const selectIsSearching = (state: AppState) =>
  state.jobsData.isSearching;
