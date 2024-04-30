import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { SearchInputsService } from './search-inputs.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

const actions$ = new Observable<Action>();

describe('SearchInputsService', () => {
  let service: SearchInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$)],
    });
    service = TestBed.inject(SearchInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
