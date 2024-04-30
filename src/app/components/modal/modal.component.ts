import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input({ required: true }) renderModal: Subject<boolean> = new Subject();

  closeModalOnParentClick() {
    this.renderModal.next(false);
  }
}
