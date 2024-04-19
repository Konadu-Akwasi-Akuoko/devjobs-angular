import { createReducer, on } from '@ngrx/store';
import { setTheme } from './theme.action';

export interface Theme {
  theme: 'light' | 'dark';
}

export const initialState: Theme = {
  theme: 'light',
};

export const themeReducer = createReducer(
  initialState,
  on(setTheme, (state: Theme, props) => ({
    ...state,
    theme: props.theme,
  }))
);
