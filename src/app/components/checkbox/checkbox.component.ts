import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input({ required: true }) checkBoxFormControl: FormControl<boolean | null> =
    new FormControl(false);
  @Input({ required: true }) label: string = '';
  @Input() onClick: () => void = () => {};
}
