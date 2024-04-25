import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Input({ required: true }) errorMessage: string = '';
  @Input({ required: true }) buttonMessage: string = '';  
  @Input({ required: true }) buttonLink: string = '';
}
