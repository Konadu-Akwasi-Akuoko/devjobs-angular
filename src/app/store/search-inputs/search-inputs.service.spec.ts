import { TestBed } from '@angular/core/testing';

import { SearchInputsService } from './search-inputs.service';

describe('SearchInputsService', () => {
  let service: SearchInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
