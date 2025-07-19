import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthApiService {
	private apiUrl = 'http://localhost:3000/auth';

	constructor(private http: HttpClient) { }

	login(credentials: { username: string; password: string }): Observable<any> {
		return this.http.post<{ access_token: string, user: User }>(`${this.apiUrl}/login`, credentials).pipe(
			tap(response => {
				sessionStorage.setItem('access_token', response.access_token);
				sessionStorage.setItem('user', JSON.stringify(response.user));
			})
		);
	}
}
