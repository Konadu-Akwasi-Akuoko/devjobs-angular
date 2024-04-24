import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, CheckboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  companyFormControl = new FormControl('');
  companyName = 'company';
  companyIconSrc = '/assets/desktop/icon-search.svg';

  locationFormControl = new FormControl('');
  locationName = 'location';
  locationIconSrc = '/assets/desktop/icon-location.svg';

  checkBoxFormControl = new FormControl(false);
}
