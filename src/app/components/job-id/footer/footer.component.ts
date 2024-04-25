import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input({ required: true }) position: string = '';
  @Input({ required: true }) company: string = '';
  @Input({ required: true }) applyUrl: string = '';
}
