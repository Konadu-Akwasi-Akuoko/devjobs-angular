import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { setTheme } from './store/theme/theme.action';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore({})],
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch setTheme action if theme is found in localStorage', () => {
    // Mock localStorage.getItem to return 'dark'
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('dark');
    const storeSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(setTheme({ theme: 'dark' }));
  });
});
