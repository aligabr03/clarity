import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthApiService } from '../services/api/auth-api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthApiService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add access token to request
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      req = this.addTokenToRequest(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 errors (token expired)
        if (error.status === 401 && !req.url.includes('/login') && !req.url.includes('/signup')) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      }),
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((response: { accessToken: string }) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.accessToken);

          // Retry original request with new token
          return next.handle(this.addTokenToRequest(request, response.accessToken));
        }),
        catchError((error) => {
          // Refresh failed - redirect to login
          this.isRefreshing = false;
          this.router.navigate(['/login']);
          return throwError(() => error);
        }),
      );
    } else {
      // Wait for refresh to complete, then retry request
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenToRequest(request, token))),
      );
    }
  }
}
