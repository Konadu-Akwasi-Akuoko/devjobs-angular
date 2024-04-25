import { createAction, props } from '@ngrx/store';
import { allJobDataType } from '../../../lib/types/types';

export const setInitialJobsData = createAction('[Jobs] Set Initial Jobs Data');

export const setJobsData = createAction(
  '[Jobs] Set Jobs Data',
  props<{ jobs: allJobDataType[] }>()
);

export const setJobsLoadingState = createAction(
  '[Jobs] Set Jobs Loading State',
  props<{ state: 'LOADING' | 'SUCCESS' | 'ERROR' | '' }>()
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
