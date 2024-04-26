import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { miniJobDataType } from '../../../lib/types/types';
import { loadJobs } from '../../store/jobs/jobs.action';
import {
  selectCanLoadNextJob,
  selectFilteredJobs,
} from '../../store/jobs/jobs.selector';
import { AppState } from '../../store/store';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-jobs-section',
  standalone: true,
  imports: [JobCardComponent, AsyncPipe],
  templateUrl: './jobs-section.component.html',
  styleUrl: './jobs-section.component.css',
})
export class JobsSectionComponent implements OnInit, OnDestroy {
  jobsData$: Observable<miniJobDataType[]>;
  canLoadNext$: Observable<boolean>;
  jobDataSubscription!: Subscription;
  numberOfCurrentJobs = 0;

  constructor(private store: Store<AppState>) {
    this.jobsData$ = this.store.select(selectFilteredJobs);
    this.canLoadNext$ = this.store.select(selectCanLoadNextJob);
  }

  ngOnInit(): void {
    this.jobDataSubscription = this.jobsData$.subscribe((data) => {
      this.numberOfCurrentJobs = data.length;
    });
  }

  ngOnDestroy(): void {
    this.jobDataSubscription.unsubscribe();
  }

  onClickLoadMore() {
    this.store.dispatch(
      loadJobs({ numberOfCurrentJobs: this.numberOfCurrentJobs })
    );
  }
}
