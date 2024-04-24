import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { ModalComponent } from '../modal/modal.component';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CheckboxComponent, FormInputComponent, ModalComponent, AsyncPipe],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css',
})
export class FilterButtonComponent {
  @Input({ required: true }) checkBoxFormControl = new FormControl(false);
  @Input({ required: true }) locationFormControl = new FormControl('');
  @Input({ required: true }) locationName = 'company';
  @Input({ required: true }) locationIconSrc =
    './assets/desktop/icon-search.svg';

  renderModal: Subject<boolean> = new Subject<boolean>();

  onFilterButtonClicked() {
    this.renderModal.next(true);
  }
}
