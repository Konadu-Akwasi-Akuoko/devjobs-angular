import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next on renderModal with false when closeModalOnParentClick is called', () => {
    const nextSpy = jest.spyOn(component.renderModal, 'next');
    component.closeModalOnParentClick();
    expect(nextSpy).toHaveBeenCalledWith(false);
  });
});
