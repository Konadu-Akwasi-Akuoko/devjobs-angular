import { createReducer, on } from '@ngrx/store';
import { setTheme } from './theme.action';

export interface ITheme {
  theme: 'light' | 'dark';
}

export const initialState: ITheme = {
  theme: 'light',
};

export const themeReducer = createReducer(
  initialState,
  on(setTheme, (state: ITheme, props) => ({
    ...state,
    theme: props.theme,
  }))
);
