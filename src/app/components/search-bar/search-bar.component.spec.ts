import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchBarComponent } from './search-bar.component';
import { setFilteredJobs } from '../../store/jobs/jobs.action';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store: MockStore;

  const initialState = {
    isFullTimeInput: false,
    locationInput: '',
    titleCompanyExpertiseInput: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchInputs when store emits new value', () => {
    const mockInputs = {
      isFullTimeInput: true,
      locationInput: 'Test Location',
      titleCompanyExpertiseInput: 'Test Input',
    };
    store.setState({ searchInputs: mockInputs });
    store.refreshState();
    expect(component.searchInputs).toEqual(mockInputs);
  });

  it('should dispatch setFilteredJobs action when form value changes', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.searchFormGroup.setValue({
      company: 'Test Company',
      location: 'Test Location',
      isFullTime: true,
    });
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch setFilteredJobs action when onSearchButtonClick is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onSearchButtonClick();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch setFilteredJobs action with default values when form control values are null', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Set form control values to null
    component.companyFormControl.setValue(null);
    component.locationFormControl.setValue(null);
    component.checkBoxFormControl.setValue(null);

    component.onSearchButtonClick();

    expect(dispatchSpy).toHaveBeenCalledWith(
      setFilteredJobs({
        companyTitleExpertise: '',
        location: '',
        isFullTime: false,
      })
    );
  });
});
