import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/store';
import { setTheme } from '../../store/theme/theme.action';
import { ITheme } from '../../store/theme/theme.reducer';
import { selectTheme } from '../../store/theme/theme.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  theme$: Observable<ITheme>;
  theme!: 'light' | 'dark';

  constructor(private store: Store<AppState>) {
    this.theme$ = store.select(selectTheme);
  }

  ngOnInit(): void {}

  onToggleThemeClick() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.store.dispatch(setTheme({ theme: newTheme }));
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  ngOnDestroy(): void {}
}
