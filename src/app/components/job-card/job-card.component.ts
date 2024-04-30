import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { miniJobDataType } from '../../../lib/types/types';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in <=> out', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class JobCardComponent implements AfterViewInit {
  @Input({ required: true }) props!: miniJobDataType;
  animationState = 'out';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animationState = 'in';
    });
  }
}
