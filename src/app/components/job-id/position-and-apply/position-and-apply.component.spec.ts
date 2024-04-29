import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAndApplyComponent } from './position-and-apply.component';

describe('PositionAndApplyComponent', () => {
  let component: PositionAndApplyComponent;
  let fixture: ComponentFixture<PositionAndApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionAndApplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionAndApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
