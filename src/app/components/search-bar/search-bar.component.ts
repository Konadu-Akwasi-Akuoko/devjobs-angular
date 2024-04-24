import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, Subscription } from 'rxjs';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FilterButtonComponent } from '../filter-button/filter-button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    CheckboxComponent,
    FilterButtonComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
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
