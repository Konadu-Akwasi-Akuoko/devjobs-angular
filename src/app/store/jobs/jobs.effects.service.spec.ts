import { TestBed } from '@angular/core/testing';

import { JobsEffectsService } from './jobs.effects.service';

describe('JobsEffectsService', () => {
  let service: JobsEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
