import { AppState } from '../store';

export const selectSearchInputs = (state: AppState) => state.searchInputs;

export const selectTitleCompanyExpertiseInput = (state: AppState) =>
  state.searchInputs.titleCompanyExpertiseInput;

export const selectLocationInput = (state: AppState) => state.searchInputs.locationInput;

export const selectIsFullTimeInput = (state: AppState) => state.searchInputs.isFullTimeInput;