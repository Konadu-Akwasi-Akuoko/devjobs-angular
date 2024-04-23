import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { setTheme } from '../../store/theme/theme.action';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideMockStore({
          initialState: { theme: { currentTheme: 'light' } },
        }),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme and dispatch setTheme action', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    const storeSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');

    component.theme = 'dark';
    component.onToggleThemeClick();
    expect(component.theme).toBe('light');
    expect(storeSpy).toHaveBeenCalledWith(setTheme({ theme: 'light' }));
    expect(localStorageSpy).toHaveBeenCalledWith('theme', 'light');
  });

  it('should set newTheme to dark when current theme is light', () => {
    component.theme = 'light';
    component.onToggleThemeClick();
    expect(component.theme).toBe('dark');
  });

  it('should set newTheme to light when current theme is dark', () => {
    component.theme = 'dark';
    component.onToggleThemeClick();
    expect(component.theme).toBe('light');
  });
});
