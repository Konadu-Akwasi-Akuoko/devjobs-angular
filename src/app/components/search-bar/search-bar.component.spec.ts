import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    component.searchInputs = {
      isFullTimeInput: false,
      locationInput: '',
      titleCompanyExpertiseInput: '',
    };
    
    // expect(component).toBeTruthy();
  });
});
