import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

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
    //TODO check if token is expired
	}

  getUser(): User | null {
		const user = sessionStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	}

}