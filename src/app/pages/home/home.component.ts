import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {
  companyFormControl = new FormControl('');
  companyName = 'company';
  companyIconSrc = '/assets/desktop/icon-search.svg';

  locationFormControl = new FormControl('');
  locationName = 'location';
  locationIconSrc = '/assets/desktop/icon-location.svg';

  checkBoxFormControl = new FormControl(false);

  searchFormGroup = new FormGroup({
    company: this.companyFormControl,
    location: this.locationFormControl,
    isFullTime: this.checkBoxFormControl,
  });

  formGroupSubscription!: Subscription;


  ngOnInit(): void {
    this.formGroupSubscription = this.searchFormGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        console.log(value);
      });
  }

  ngOnDestroy(): void {
    this.formGroupSubscription.unsubscribe();
  }
}
