import { createReducer } from '@ngrx/store';
import { allJobDataType } from '../../../lib/types/types';
import { immerOn } from 'ngrx-immer/store';
import { setInitialJobsData } from './jobs.action';

export interface IJobsData {
  jobs: allJobDataType[];
}

export const initialState: IJobsData = {
  jobs: [],
};

export const jobsReducer = createReducer(
  initialState,
  immerOn(setInitialJobsData, (state: IJobsData) => {})
);
