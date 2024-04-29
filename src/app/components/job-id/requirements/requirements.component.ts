import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.css',
})
export class RequirementsComponent {
  @Input({ required: true }) requirements: {
    content: string;
    items: string[];
  } = { content: '', items: [] };
}
