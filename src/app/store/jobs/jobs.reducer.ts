import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { allJobDataType, miniJobDataType } from '../../../lib/types/types';
import {
  setActiveJobData,
  setActiveJobLoadingState,
  setActiveJobState,
  setFilteredJobs,
  setInitialJobsData,
  setJobsData,
  setJobsLoadingState,
} from './jobs.action';

export interface IJobsData {
  jobs: miniJobDataType[];
  filteredJobs: miniJobDataType[];
  jobsLoadingState: 'LOADING' | 'SUCCESS' | 'ERROR' | '';
  activeJobData: allJobDataType | null;
  activeJobLoadingState: 'LOADING' | 'SUCCESS' | 'ERROR' | '';
  activeJobId: number;
}

export const initialState: IJobsData = {
  jobs: [],
  filteredJobs: [],
  jobsLoadingState: '',
  activeJobData: null,
  activeJobLoadingState: '',
  activeJobId: 0,
};

export const jobsReducer = createReducer(
  initialState,
  immerOn(setInitialJobsData, (state: IJobsData) => {
    state.jobsLoadingState = 'LOADING';
  }),
  immerOn(setJobsData, (state: IJobsData, props) => {
    state.jobs = props.jobs;
    state.filteredJobs = props.jobs;
  }),
  immerOn(setJobsLoadingState, (state: IJobsData, props) => {
    state.jobsLoadingState = props.state;
  }),
  immerOn(setFilteredJobs, (state: IJobsData, props) => {
    const userLocation = props.location?.toLowerCase();
    const userTitleCompanyExpertise =
      props.companyTitleExpertise?.toLowerCase();

    if (
      userLocation === '' &&
      userTitleCompanyExpertise === '' &&
      props.isFullTime === false
    ) {
      state.filteredJobs = state.jobs;
    } else {
      state.filteredJobs = state.jobs.filter(
        (job) =>
          job.location.toLowerCase().includes(userLocation!) &&
          (job.position.toLowerCase().includes(userTitleCompanyExpertise!) ||
            job.company.toLowerCase().includes(userTitleCompanyExpertise!)) &&
          (props.isFullTime ? job.contract === 'Full Time' : job.contract)
      );
    }
  }),
  immerOn(setActiveJobState, (state: IJobsData, props) => {
    state.activeJobLoadingState = 'LOADING';
    state.activeJobId = props.id;
  }),
  immerOn(setActiveJobData, (state: IJobsData, props) => {
    state.activeJobData = props.data;
  }),
  immerOn(setActiveJobLoadingState, (state: IJobsData, props) => {
    state.activeJobLoadingState = props.state;
  })
);
