import { TestBed } from '@angular/core/testing';
import { JobsEffectsService } from './jobs.effects.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

describe('JobsEffectsService', () => {
  let service: JobsEffectsService;
  const actions$ = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$)],
    });
    service = TestBed.inject(JobsEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
