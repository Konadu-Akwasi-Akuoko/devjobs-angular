import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { allJobDataType, miniJobDataType } from '../../../lib/types/types';
import {
  setActiveJobData,
  setActiveJobLoadingState,
  setActiveJobState,
  setFilteredJobs,
  loadJobs,
  setJobsData,
  setJobsLoadingState,
  setLocations,
} from './jobs.action';

export interface IJobsData {
  jobs: miniJobDataType[];
  filtrableJobs: miniJobDataType[];
  jobsLoadingState: 'LOADING' | 'SUCCESS' | 'ERROR' | '';
  activeJobData: allJobDataType | null;
  activeJobLoadingState: 'LOADING' | 'SUCCESS' | 'ERROR' | '';
  activeJobId: number;
  numberOfCurrentJobs: number;
  canLoadNextData: boolean;
  isSearching: boolean;
  locations: string[];
}

export const initialState: IJobsData = {
  jobs: [],
  filtrableJobs: [],
  jobsLoadingState: '',
  activeJobData: null,
  activeJobLoadingState: '',
  activeJobId: 0,
  numberOfCurrentJobs: 0,
  canLoadNextData: false,
  isSearching: false,
  locations: [],
};

export const jobsReducer = createReducer(
  initialState,
  immerOn(loadJobs, (state: IJobsData, props) => {
    state.jobsLoadingState = 'LOADING';
    state.numberOfCurrentJobs = props.numberOfCurrentJobs;
  }),
  immerOn(setJobsData, (state: IJobsData, props) => {
    state.jobs = props.jobs;
    state.filtrableJobs = props.jobs;
  }),
  immerOn(setJobsLoadingState, (state: IJobsData, props) => {
    state.jobsLoadingState = props.state;
    state.canLoadNextData = props.canLoadNext;
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
      state.filtrableJobs = state.jobs;
      state.isSearching = false;
    } else {
      state.isSearching = true;
      state.filtrableJobs = state.jobs.filter(
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
  }),
  immerOn(setLocations, (state: IJobsData, props) => {
    state.locations = props.locations;
  })
);
