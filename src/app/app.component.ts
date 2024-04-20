import {
  afterNextRender,
  afterRender,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITheme } from './store/theme/theme.reducer';
import { setTheme } from './store/theme/theme.action';
import { selectTheme } from './store/theme/theme.selectors';
import { AppState } from './store/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  theme$: Observable<ITheme>;

  constructor(private store: Store<AppState>) {
    this.theme$ = store.select(selectTheme);

    afterNextRender(() => {
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
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
