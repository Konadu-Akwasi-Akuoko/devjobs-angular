import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITheme } from './store/theme/theme.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'devjobs-angular';

  theme$: Observable<ITheme>;
  themeSubscription!: Subscription;

  constructor(private store: Store<{ theme: ITheme }>) {
    this.theme$ = store.select('theme');
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme$.subscribe((theme) => {
      console.log(theme.theme);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
