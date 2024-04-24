import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-id',
  standalone: true,
  imports: [],
  templateUrl: './job-id.component.html',
  styleUrl: './job-id.component.css',
})
export class JobIdComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
    });
  }
}
