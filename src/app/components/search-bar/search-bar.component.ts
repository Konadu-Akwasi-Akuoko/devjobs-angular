import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setFilteredJobs } from '../../store/jobs/jobs.action';
import { AppState } from '../../store/store';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FilterButtonComponent } from '../filter-button/filter-button.component';
import { FormInputComponent } from '../form-input/form-input.component';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.formGroupSubscription = this.searchFormGroup.valueChanges.subscribe(
      (value) => {
        this.store.dispatch(
          setFilteredJobs({
            companyTitleExpertise: value.company!,
            location: value.location!,
            isFullTime: value.isFullTime!,
          })
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.formGroupSubscription.unsubscribe();
  }

  onSearchButtonClick() {
    console.log('search button clicked');
    this.store.dispatch(
      setFilteredJobs({
        companyTitleExpertise: this.companyFormControl.value ?? '',
        location: this.locationFormControl.value ?? '',
        isFullTime: this.checkBoxFormControl.value ?? false,
      })
    );
  }
}
