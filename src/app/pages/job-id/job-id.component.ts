import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { allJobDataType } from '../../../lib/types/types';
import { DescriptionComponent } from '../../components/job-id/description/description.component';
import { FooterComponent } from '../../components/job-id/footer/footer.component';
import { JobIdHeaderComponent } from '../../components/job-id/job-id-header/job-id-header.component';
import { PositionAndApplyComponent } from '../../components/job-id/position-and-apply/position-and-apply.component';
import { RequirementsComponent } from '../../components/job-id/requirements/requirements.component';
import { WhatWillYouDoComponent } from '../../components/job-id/what-will-you-do/what-will-you-do.component';
import { setActiveJobState } from '../../store/jobs/jobs.action';
import {
  selectActiveJobData,
  selectActiveJobLoadingState,
} from '../../store/jobs/jobs.selector';
import { AppState } from '../../store/store';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
  selector: 'app-job-id',
  standalone: true,
  imports: [
    AsyncPipe,
    JobIdHeaderComponent,
    PositionAndApplyComponent,
    DescriptionComponent,
    RequirementsComponent,
    WhatWillYouDoComponent,
    FooterComponent,
    RouterLink,
    ErrorComponent
  ],
  templateUrl: './job-id.component.html',
  styleUrl: './job-id.component.css',
})
export class JobIdComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  activeData$: Observable<allJobDataType | null>;
  activeDataLoadingState$: Observable<'LOADING' | 'SUCCESS' | 'ERROR' | ''>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.activeData$ = this.store.select(selectActiveJobData);
    this.activeDataLoadingState$ = this.store.select(
      selectActiveJobLoadingState
    );
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
