import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { miniJobDataType } from '../../../lib/types/types';
import {
  selectFilteredJobs
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
export class JobsSectionComponent {
  jobsData: Observable<miniJobDataType[]>;

  constructor(private store: Store<AppState>) {
    this.jobsData = this.store.select(selectFilteredJobs);
  }
}
