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
