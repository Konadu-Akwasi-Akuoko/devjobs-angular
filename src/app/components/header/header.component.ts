import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loadJobs } from '../../store/jobs/jobs.action';
import { selectJobsData } from '../../store/jobs/jobs.selector';
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
  theme!: 'light' | 'dark' | null;
  themeSubscription!: Subscription;
  jobsDataSubscription!: Subscription;
  jobsData$ = this.store.select(selectJobsData);
  currentJobs?: number;

  constructor(private store: Store<AppState>) {
    this.theme$ = store.select(selectTheme);
    store.dispatch(
      loadJobs({
        numberOfCurrentJobs: this.currentJobs ?? 0,
      })
    );
    // store.dispatch
  }

  ngOnInit(): void {
    this.jobsDataSubscription = this.jobsData$.subscribe((data) => {
      this.currentJobs = data.jobs.length;
    });

    this.themeSubscription = this.theme$.subscribe((theme) => {
      this.theme = theme.currentTheme;
    });
  }

  ngOnDestroy(): void {
    this.jobsDataSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  onToggleThemeClick() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.store.dispatch(setTheme({ theme: newTheme }));
    this.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  }
}
