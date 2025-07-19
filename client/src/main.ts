import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { BaseAppComponent } from './app/base-app/base-app.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(BaseAppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    // Register the Auth Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
});
