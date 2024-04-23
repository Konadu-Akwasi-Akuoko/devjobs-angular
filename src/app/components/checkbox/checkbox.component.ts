import { Component, Input } from '@angular/core';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input({ required: true }) checkBoxFormControl: FormControl = new FormControl(
    ''
  );
  @Input({ required: true }) value: boolean = false;
  @Input({ required: true }) label: string = '';
  @Input() onClick: () => void = () => {};
}
