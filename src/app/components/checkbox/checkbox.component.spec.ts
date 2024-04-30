import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update checkBoxFormControl when input is set', () => {
    const control = new FormControl(true);
    component.checkBoxFormControl = control;
    fixture.detectChanges();
    expect(component.checkBoxFormControl.value).toBe(true);
  });

  it('should update label when input is set', () => {
    const label = 'Test Label';
    component.label = label;
    fixture.detectChanges();
    expect(component.label).toBe(label);
  });

  it('should update onClick when input is set', () => {
    const onClick = () => console.log('Test');
    component.onClick = onClick;
    fixture.detectChanges();
    expect(component.onClick).toBe(onClick);
  });

  it('should not throw when default onClick is called', () => {
    expect(() => component.onClick()).not.toThrow();
  });
  
});
