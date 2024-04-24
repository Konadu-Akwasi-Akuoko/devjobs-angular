import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { FilterButtonComponent } from '../../components/filter-button/filter-button.component';
import { FormInputComponent } from '../../components/form-input/form-input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    CheckboxComponent,
    FilterButtonComponent,
  ],
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
