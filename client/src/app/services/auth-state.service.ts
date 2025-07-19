import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthApiService } from './api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor(private authApi: AuthApiService) {}

  get loginState$() {
    return this.authApi.getAccessToken$().pipe(map((token) => !!token));
  }

  get user$() {
    return this.authApi.getCurrentUser$();
  }

  isLoggedIn(): boolean {
    return this.authApi.isAuthenticated();
  }

  getUser() {
    return this.authApi.getCurrentUser();
  }

  login(credentials: any) {
    return this.authApi.login(credentials);
  }

  logout() {
    return this.authApi.logout();
  }
}
