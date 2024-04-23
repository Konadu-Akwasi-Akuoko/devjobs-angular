import { ITheme, themeReducer } from './theme/theme.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  theme: ITheme;
}

export const reducers: ActionReducerMap<AppState> = {
  theme: themeReducer,
};
