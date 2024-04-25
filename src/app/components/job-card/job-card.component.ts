import { Component, Input } from '@angular/core';
import { miniJobDataType } from '../../../lib/types/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input({ required: true }) props!: miniJobDataType;

  constructor() {}
}
