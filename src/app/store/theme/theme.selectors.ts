import { createFeatureSelector } from '@ngrx/store';
import { ITheme } from './theme.reducer';

export const selectTheme = createFeatureSelector<Readonly<ITheme>>('theme');
