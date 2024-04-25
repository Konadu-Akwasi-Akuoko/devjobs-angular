import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-position-and-apply',
  standalone: true,
  imports: [],
  templateUrl: './position-and-apply.component.html',
  styleUrl: './position-and-apply.component.css',
})
export class PositionAndApplyComponent {
  @Input({ required: true }) postedAt: string = '';
  @Input({ required: true }) contract: string = '';
  @Input({ required: true }) position: string = '';
  @Input({ required: true }) location: string = '';
  @Input({ required: true }) applyUrl: string = '';
}
