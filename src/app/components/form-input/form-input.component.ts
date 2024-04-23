import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClassNameValue } from 'tailwind-merge';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
})
export class FormInputComponent {
  @Input({ required: true }) nameFormControl: FormControl = new FormControl('');
  @Input({ required: true }) name: string = '';
  @Input() iconSrc: string | null = null;
  @Input() class: ClassNameValue = '';
  twMerge = twMerge;
}
