import { Component } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import { selectJobsData } from '../../store/jobs/jobs.selector';
import { Observable } from 'rxjs';
import { IJobsData } from '../../store/jobs/jobs.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-jobs-section',
  standalone: true,
  imports: [JobCardComponent, AsyncPipe],
  templateUrl: './jobs-section.component.html',
  styleUrl: './jobs-section.component.css',
})
export class JobsSectionComponent {
  jobsData : Observable<IJobsData>;

  constructor(private store: Store<AppState>) {
    this.jobsData = this.store.select(selectJobsData);
  }
}
