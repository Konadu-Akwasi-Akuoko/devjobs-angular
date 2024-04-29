import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobIdHeaderComponent } from './job-id-header.component';

describe('JobIdHeaderComponent', () => {
  let component: JobIdHeaderComponent;
  let fixture: ComponentFixture<JobIdHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobIdHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobIdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
