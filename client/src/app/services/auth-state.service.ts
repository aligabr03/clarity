import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  constructor() {
    if (this.isLoggedIn()) {
      this.setLoginState(true);
    } else {
      this.setLoginState(false);
    }
  }

  setLoginState(isLoggedIn: boolean) {
    this.loginState.next(isLoggedIn);
  }

  logout() {
    sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('user');
    this.setLoginState(false);
  }

  isLoggedIn(): boolean {
		return !!sessionStorage.getItem('access_token');
	}

  getUser(): any {
		const user = sessionStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	}

}