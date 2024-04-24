import { Component, Input } from '@angular/core';
import { miniJobDataType } from '../../../lib/types/types';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input({ required: true }) props!: miniJobDataType;

  constructor() {}
}
