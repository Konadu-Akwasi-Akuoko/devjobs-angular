import { AppState } from '../store';

export const selectJobsData = (state: AppState) => state.jobsData;

export const selectActiveJobData = (state: AppState) =>
  state.jobsData.activeJobData;

export const selectActiveJobLoadingState = (state: AppState) =>
  state.jobsData.activeJobLoadingState;
