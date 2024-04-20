import { createReducer, on } from '@ngrx/store';
import { setTheme } from './theme.action';
import { immerOn } from 'ngrx-immer/store';

export interface ITheme {
  currentTheme: 'light' | 'dark';
}

export const initialState: ITheme = {
  currentTheme: 'light',
};

export const themeReducer = createReducer(
  initialState,
  immerOn(setTheme, (state: ITheme, props) => ({
    currentTheme: props.theme,
  }))
);
