import { createFeatureSelector } from '@ngrx/store';
import { Theme } from './theme.reducer';

export const selectTheme = createFeatureSelector<Readonly<Theme>>('theme');
