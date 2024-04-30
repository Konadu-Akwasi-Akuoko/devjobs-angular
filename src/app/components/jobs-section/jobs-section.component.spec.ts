import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSectionComponent } from './jobs-section.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadJobs } from '../../store/jobs/jobs.action';
import { of } from 'rxjs';
import data from '../../../lib/data/data.json';

describe('JobsSectionComponent', () => {
  let component: JobsSectionComponent;
  let fixture: ComponentFixture<JobsSectionComponent>;
  let store: MockStore;

  const initialState = {
    jobs: [],
    filtrableJobs: [],
    jobsLoadingState: '',
    activeJobData: null,
    activeJobLoadingState: '',
    activeJobId: 0,
    numberOfCurrentJobs: 0,
    canLoadNextData: false,
    isSearching: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsSectionComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables correctly', () => {
    expect(component.jobsData$).toBeDefined();
    expect(component.canLoadNext$).toBeDefined();
    expect(component.isSearching$).toBeDefined();
  });

  it('should initialize jobDataSubscription and update numberOfCurrentJobs in ngOnInit', () => {
    component.ngOnInit();
    expect(component.jobDataSubscription).toBeDefined();
    expect(component.numberOfCurrentJobs).toBe(0);
  });

  it('should unsubscribe jobDataSubscription in ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(
      component.jobDataSubscription,
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should dispatch loadJobs action in onClickLoadMore', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.onClickLoadMore();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(loadJobs({ numberOfCurrentJobs: 0 }));
  });

  it('should update numberOfCurrentJobs on ngOnInit', () => {
    const mockJobsData = [
      {
        ...data[0],
      },
      {
        ...data[1],
      },
    ];
    component.jobsData$ = of(mockJobsData);

    component.ngOnInit();

    expect(component.numberOfCurrentJobs).toBe(mockJobsData.length);
  });
});
