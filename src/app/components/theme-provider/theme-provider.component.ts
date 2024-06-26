import { AsyncPipe } from '@angular/common';
import {
  afterNextRender,
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/store';
import { setTheme } from '../../store/theme/theme.action';
import { ITheme } from '../../store/theme/theme.reducer';
import { selectTheme } from '../../store/theme/theme.selectors';

@Component({
  selector: 'app-theme-provider',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './theme-provider.component.html',
  styleUrl: './theme-provider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeProviderComponent {
  theme$: Observable<ITheme>;

  constructor(private store: Store<AppState>) {
    this.theme$ = store.select(selectTheme);

    afterNextRender(
      () => {
        // Check for theme in local storage, otherwise check for system theme
        const theme = localStorage.getItem('theme');
        if (theme) {
          this.store.dispatch(setTheme({ theme: theme as 'light' | 'dark' }));
        } else {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.store.dispatch(setTheme({ theme: 'dark' }));
          } else {
            this.store.dispatch(setTheme({ theme: 'light' }));
          }
        }
      },
      { phase: AfterRenderPhase.Write }
    );
  }
}
