import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWillYouDoComponent } from './what-will-you-do.component';

describe('WhatWillYouDoComponent', () => {
  let component: WhatWillYouDoComponent;
  let fixture: ComponentFixture<WhatWillYouDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatWillYouDoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatWillYouDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
