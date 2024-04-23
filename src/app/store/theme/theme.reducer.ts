import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { setTheme } from './theme.action';

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
