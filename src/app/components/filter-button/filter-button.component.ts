import { AsyncPipe } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { Subject, firstValueFrom } from 'rxjs';
import { selectLocations } from '../../store/jobs/jobs.selector';
import { selectSearchInputs } from '../../store/search-inputs/search-input.selectors';
import { AppState } from '../../store/store';
import { selectTheme } from '../../store/theme/theme.selectors';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [
    CheckboxComponent,
    FormInputComponent,
    ModalComponent,
    AsyncPipe,
    BrnCommandImports,
    HlmCommandImports,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
  ],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css',
})
export class FilterButtonComponent {
  @Input({ required: true }) checkBoxFormControl = new FormControl(false);
  // @Input({ required: true }) locationFormControl = new FormControl('');
  // @Input({ required: true }) locationName = 'company';
  // @Input({ required: true }) locationIconSrc =
  //   './assets/desktop/icon-search.svg';
  @Input({ required: true }) searchFormGroup!: FormGroup;
  @Input({ required: true }) currentLocation = signal<string | undefined>('');

  private store: Store<AppState> = inject(Store);

  currentTheme = this.store.select(selectTheme);

  renderModal: Subject<boolean> = new Subject<boolean>();

  comboboxStateChange(state: 'open' | 'closed') {
    this.state.set(state);
  }

  // ! Combobox
  allLocations = this.store.select(selectLocations);
  // currentLocation = signal<string | undefined>(undefined);
  state = signal<'closed' | 'open'>('closed');

  constructor() {
    this.updateLocationValue();
  }

  async updateLocationValue() {
    const data = await firstValueFrom(this.store.select(selectSearchInputs));
    this.currentLocation.set(data.locationsCombobox);
  }

  commandSelected(location: string) {
    this.state.set('closed');
    this.currentLocation.set(location);
    this.searchFormGroup.updateValueAndValidity({ emitEvent: true });
  }

  onFilterButtonClicked() {
    this.renderModal.next(true);
  }
}
