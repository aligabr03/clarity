import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(HomePageComponent, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes)],
})
