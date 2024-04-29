import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import  {ChildrenOutletContexts} from '@angular/router';
import { ThemeProviderComponent } from './components/theme-provider/theme-provider.component';
import { HeaderComponent } from './components/header/header.component';
// import { slideInAnimation } from '../lib/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ThemeProviderComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // animations: [slideInAnimation],
})
export class AppComponent {
  // constructor(private contexts: ChildrenOutletContexts) {}
  // getRouteAnimationData() {
  //   return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
  //     'animation'
  //   ];
  // }
}
