import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonComponent } from './filter-button.component';

describe('FilterButtonComponent', () => {
  let component: FilterButtonComponent;
  let fixture: ComponentFixture<FilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next on renderModal with true when onFilterButton is called', () => {
    const nextSpy = jest.spyOn(component.renderModal, 'next');
    component.onFilterButtonClicked();
    expect(nextSpy).toHaveBeenCalledWith(true);
  })
});
