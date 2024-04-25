import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { Observable, Subscription } from 'rxjs';
import { setActiveJobState } from '../../store/jobs/jobs.action';
import { selectActiveJobData } from '../../store/jobs/jobs.selector';
import { allJobDataType } from '../../../lib/types/types';
import { AsyncPipe } from '@angular/common';
import { JobIdHeaderComponent } from '../../components/job-id-header/job-id-header.component';

@Component({
  selector: 'app-job-id',
  standalone: true,
  imports: [AsyncPipe, JobIdHeaderComponent],
  templateUrl: './job-id.component.html',
  styleUrl: './job-id.component.css',
})
export class JobIdComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  activeData$: Observable<allJobDataType | null>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.activeData$ = this.store.select(selectActiveJobData);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch(setActiveJobState({ id: params['id'] }));
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
