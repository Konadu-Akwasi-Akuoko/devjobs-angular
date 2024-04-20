import {
  afterNextRender,
  AfterRenderPhase,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { selectTheme } from '../../store/theme/theme.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable } from 'rxjs';
import { ITheme } from '../../store/theme/theme.reducer';
import { setTheme } from '../../store/theme/theme.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-theme-provider',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './theme-provider.component.html',
  styleUrl: './theme-provider.component.css',
})
export class ThemeProviderComponent {
  theme$: Observable<ITheme>;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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
        // Manually trigger change detection because the afterNextRender function
        // happens outside of the normal Angular change detection cycle
        changeDetectorRef.detectChanges();
      },
      { phase: AfterRenderPhase.Write }
    );
  }
}
