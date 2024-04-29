import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { JobsSectionComponent } from '../../components/jobs-section/jobs-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, JobsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
