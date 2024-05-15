import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { firstValueFrom, Subscription } from 'rxjs';
import { setFilteredJobs } from '../../store/jobs/jobs.action';
import { selectLocations } from '../../store/jobs/jobs.selector';
import { selectSearchInputs } from '../../store/search-inputs/search-input.selectors';
import { ISearchInputs } from '../../store/search-inputs/search-inputs.reducer';
import { AppState } from '../../store/store';
import { selectTheme } from '../../store/theme/theme.selectors';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FilterButtonComponent } from '../filter-button/filter-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { HlmButtonDirective } from '../ui-button-helm/src/lib/hlm-button.directive';
import { HlmPopoverContentDirective } from '../ui-popover-helm/src/lib/hlm-popover-content.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    CheckboxComponent,
    FilterButtonComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store);

  searchInputs: ISearchInputs = {
    isFullTimeInput: false,
    locationsCombobox: '',
    titleCompanyExpertiseInput: '',
  };

  currentTheme = this.store.select(selectTheme);

  searchInputsSubscription!: Subscription;

  companyFormControl = new FormControl(
    this.searchInputs.titleCompanyExpertiseInput
  );
  companyName = 'company';
  companyIconSrc = '/assets/desktop/icon-search.svg';

  // locationFormControl = new FormControl(this.searchInputs.locationInput);
  locationName = 'location';
  locationIconSrc = '/assets/desktop/icon-location.svg';

  checkBoxFormControl = new FormControl(this.searchInputs.isFullTimeInput);

  searchFormGroup = new FormGroup({
    company: this.companyFormControl,
    // location: this.locationFormControl,
    isFullTime: this.checkBoxFormControl,
  });

  formGroupSubscription!: Subscription;

  // ! Combobox

  allLocations = this.store.select(selectLocations);
  currentLocation = signal<string | undefined>('');
  state = signal<'closed' | 'open'>('closed');

  constructor() {
    this.updateLocationValue();
  }

  async updateLocationValue() {
    const data = await firstValueFrom(this.store.select(selectSearchInputs));
    this.currentLocation.set(data.locationsCombobox);
  }

  comboboxStateChange(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(location: string) {
    this.state.set('closed');
    if (this.currentLocation() === location || location === '') {
      this.currentLocation.set('');
      this.searchFormGroup.updateValueAndValidity({ emitEvent: true });
      return;
    }
    this.currentLocation.set(location);
    this.searchFormGroup.updateValueAndValidity({ emitEvent: true });
  }

  ngOnInit(): void {
    this.formGroupSubscription = this.searchFormGroup.valueChanges.subscribe(
      (value) => {
        console.log('Dispatched');
        this.store.dispatch(
          setFilteredJobs({
            companyTitleExpertise: value.company!,
            location: this.currentLocation(),
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
        location: this.currentLocation(),
        isFullTime: this.checkBoxFormControl.value ?? false,
      })
    );
  }
}
