import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-id-header',
  standalone: true,
  imports: [],
  templateUrl: './job-id-header.component.html',
  styleUrl: './job-id-header.component.css',
})
export class JobIdHeaderComponent {
  @Input({ required: true }) logoBackground: string = '';
  @Input({ required: true }) logoSrc: string = '';
  @Input({ required: true }) companyName: string = '';
  @Input({ required: true }) companyWebsiteURL: string = '';
}
