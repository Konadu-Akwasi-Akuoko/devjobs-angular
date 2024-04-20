import { ActionReducer, combineReducers } from '@ngrx/store';
import { ITheme, themeReducer } from './theme/theme.reducer';

export interface AppState {
  theme: ITheme;
}

export const reducers = {
  theme: themeReducer,
};
