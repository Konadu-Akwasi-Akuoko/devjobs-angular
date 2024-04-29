import { createReducer } from '@ngrx/store';
import { setSearchInputs } from './search-inputs.actions';
import { immerOn } from 'ngrx-immer/store';

export interface ISearchInputs {
  titleCompanyExpertiseInput: string;
  locationInput: string;
  isFullTimeInput: boolean;
}

export const initialState: ISearchInputs = {
  titleCompanyExpertiseInput: '',
  locationInput: '',
  isFullTimeInput: false,
};

export const searchInputsReducer = createReducer(
  initialState,
  immerOn(setSearchInputs, (state: ISearchInputs, props) => {
    state.titleCompanyExpertiseInput =
      props.searchInputs.titleCompanyExpertiseInput;
    state.locationInput = props.searchInputs.locationInput;
    state.isFullTimeInput = props.searchInputs.isFullTimeInput;
  })
);
