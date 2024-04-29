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
  @Input({ required: true }) inputFormControl: FormControl = new FormControl('');
  @Input({ required: true }) inputName: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input() iconSrc: string | null = null;
  @Input() class: ClassNameValue = '';
  twMerge = twMerge('flex flex-row items-center gap-x-4 rounded-[6px] bg-white px-8 dark:bg-primary-very-dark-blue', this.class);
}
