import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobCardComponent } from './job-card.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardComponent],
      providers: [provideRouter(routes), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    component.props = {
      id: 1,
      company: 'Scoot',
      logo: './assets/logos/scoot.svg',
      logoBackground: '#E99210',
      position: 'Senior Software Engineer',
      postedAt: '5h ago',
      contract: 'Full Time',
      location: 'United Kingdom',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values for inputs and properties', () => {
    expect(component.props).toBeDefined();
    expect(component.animationState).toBe('out');
  });

  it('should update animationState in ngAfterViewInit', (done) => {
    component.ngAfterViewInit();
    setTimeout(() => {
      expect(component.animationState).toBe('in');
      done();
    }, 1000); // wait for the setTimeout in ngAfterViewInit
  });
});
