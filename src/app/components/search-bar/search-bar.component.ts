import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setFilteredJobs } from '../../store/jobs/jobs.action';
import { selectSearchInputs } from '../../store/search-inputs/search-input.selectors';
import { ISearchInputs } from '../../store/search-inputs/search-inputs.reducer';
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
  private store: Store<AppState> = inject(Store);

  searchInputs: ISearchInputs = {
    isFullTimeInput: false,
    locationInput: '',
    titleCompanyExpertiseInput: '',
  };

  searchInputsSubscription!: Subscription;

  companyFormControl = new FormControl(
    this.searchInputs.titleCompanyExpertiseInput
  );
  companyName = 'company';
  companyIconSrc = '/assets/desktop/icon-search.svg';

  locationFormControl = new FormControl(this.searchInputs.locationInput);
  locationName = 'location';
  locationIconSrc = '/assets/desktop/icon-location.svg';

  checkBoxFormControl = new FormControl(this.searchInputs.isFullTimeInput);

  searchFormGroup = new FormGroup({
    company: this.companyFormControl,
    location: this.locationFormControl,
    isFullTime: this.checkBoxFormControl,
  });

  formGroupSubscription!: Subscription;

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

    this.searchInputsSubscription = this.store
      .select(selectSearchInputs)
      .pipe()
      .subscribe((value) => {
        this.searchInputs = value;
      });
  }

  ngOnDestroy(): void {
    this.searchInputsSubscription.unsubscribe();
    this.formGroupSubscription.unsubscribe();
  }

  onSearchButtonClick() {
    this.store.dispatch(
      setFilteredJobs({
        companyTitleExpertise: this.companyFormControl.value ?? '',
        location: this.locationFormControl.value ?? '',
        isFullTime: this.checkBoxFormControl.value ?? false,
      })
    );
  }
}
