import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable, Subscription } from 'rxjs';
import { ITheme } from '../../store/theme/theme.reducer';
import { selectTheme } from '../../store/theme/theme.selectors';
import { AsyncPipe, NgClass } from '@angular/common';
import { setTheme } from '../../store/theme/theme.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  theme$: Observable<ITheme>;
  theme!: 'light' | 'dark';
  themeSubscription!: Subscription;
  constructor(
    private store: Store<AppState>,
    private changeDetector: ChangeDetectorRef
  ) {
    this.theme$ = store.select(selectTheme);
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme$.subscribe((theme) => {
      this.theme = theme.currentTheme;
      this.changeDetector.detectChanges();
    });
  }

  onToggleThemeClick() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.store.dispatch(setTheme({ theme: newTheme }));
    localStorage.setItem('theme', newTheme);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
