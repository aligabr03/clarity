import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, SignupRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = 'http://localhost:3000/auth';

  private accessToken$ = new BehaviorSubject<string | null>(null);
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<{ accessToken: string; user: User }>(`${this.apiUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.accessToken$.next(response.accessToken);
          this.currentUser$.next(response.user);
        }),
      );
  }

  signup(userData: SignupRequest): Observable<SignupRequest> {
    return this.http.post<SignupRequest>(`${this.apiUrl}/signup`, userData);
  }

  refresh(): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/refresh`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => {
          this.accessToken$.next(response.accessToken);
        }),
      );
  }

  logout(): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(
        `${this.apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          this.accessToken$.next(null);
          this.currentUser$.next(null);
        }),
      );
  }

  getAccessToken(): string | null {
    return this.accessToken$.value;
  }

  getAccessToken$(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  getCurrentUser$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  isAuthenticated(): boolean {
    return this.accessToken$.value !== null;
  }
}
