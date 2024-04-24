import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { allJobDataType } from '../../../lib/types/types';
import {
  setInitialJobsData,
  setJobsData,
  setJobsLoadingState,
} from './jobs.action';

export interface IJobsData {
  jobs: allJobDataType[];
  jobsLoadingState: 'LOADING' | 'SUCCESS' | 'ERROR' | '';
}

export const initialState: IJobsData = {
  jobs: [],
  jobsLoadingState: '',
};

export const jobsReducer = createReducer(
  initialState,
  immerOn(setInitialJobsData, (state: IJobsData) => {
    state.jobsLoadingState = 'LOADING';
  }),
  immerOn(setJobsData, (state: IJobsData, props) => {
    state.jobs = props.jobs;
  }),
  immerOn(setJobsLoadingState, (state: IJobsData, props) => {
    state.jobsLoadingState = props.state;
  })
);
