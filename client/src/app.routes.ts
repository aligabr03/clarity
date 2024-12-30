import { Routes } from '@angular/router';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { SignupPageComponent } from './app/pages/signup-page/signup-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
];
