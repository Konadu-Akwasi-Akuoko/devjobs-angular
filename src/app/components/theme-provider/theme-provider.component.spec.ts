import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { setTheme } from '../../store/theme/theme.action';
import { ThemeProviderComponent } from './theme-provider.component';

describe('ThemeProviderComponent', () => {
  let component: ThemeProviderComponent;
  let fixture: ComponentFixture<ThemeProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeProviderComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    fixture = TestBed.createComponent(ThemeProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setTheme action if theme is found in localStorage', () => {
    // Mock localStorage.getItem to return 'dark'
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('dark');
    const storeSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    const fixture = TestBed.createComponent(ThemeProviderComponent);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(setTheme({ theme: 'dark' }));
  });

  it('should dispatch setTheme action if system theme is dark', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const storeSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    const fixture = TestBed.createComponent(ThemeProviderComponent);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(setTheme({ theme: 'dark' }));
  });
});
