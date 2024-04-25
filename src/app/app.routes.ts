import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobIdComponent } from './pages/job-id/job-id.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: ':id', component: JobIdComponent },
    ],
  },
  { path: '**', redirectTo: '/' },
];
