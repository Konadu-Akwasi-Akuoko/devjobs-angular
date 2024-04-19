import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITheme } from './store/theme/theme.reducer';
import { setTheme } from './store/theme/theme.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  theme: 'light' | 'dark' = 'light';

  theme$: Observable<ITheme>;
  themeSubscription!: Subscription;

  constructor(private store: Store<{ theme: ITheme }>) {
    this.theme$ = store.select('theme');
    store.dispatch(setTheme({ theme: 'light' }));
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme$.subscribe((theme) => {
      this.theme = theme.theme;
    });

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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
