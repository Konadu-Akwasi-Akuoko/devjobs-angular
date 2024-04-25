import { createAction, props } from '@ngrx/store';
import { allJobDataType, miniJobDataType } from '../../../lib/types/types';

export const loadJobs = createAction(
  '[Jobs] Set Initial Jobs Data',
  props<{ numberOfCurrentJobs: number }>()
);

export const setJobsData = createAction(
  '[Jobs] Set Jobs Data',
  props<{ jobs: miniJobDataType[] }>()
);

export const setJobsLoadingState = createAction(
  '[Jobs] Set Jobs Loading State',
  props<{ state: 'LOADING' | 'SUCCESS' | 'ERROR' | ''; canLoadNext: boolean }>()
);

export const setFilteredJobs = createAction(
  '[Jobs] Set Filtered Jobs',
  props<{
    companyTitleExpertise?: string;
    isFullTime?: boolean;
    location?: string;
  }>()
);

export const setActiveJobData = createAction(
  '[Job] Set Active Job Data',
  props<{ data: allJobDataType }>()
);

export const setActiveJobState = createAction(
  '[Job] Start Loading Active Job Data',
  props<{ id: number }>()
);

export const setActiveJobLoadingState = createAction(
  '[Job] Set Active Job Loading State',
  props<{ state: 'LOADING' | 'SUCCESS' | 'ERROR' | '' }>()
);
