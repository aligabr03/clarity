import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import theme from './theme';

bootstrapApplication(HomePageComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: theme,
      },
      ripple: true
    })],
})
