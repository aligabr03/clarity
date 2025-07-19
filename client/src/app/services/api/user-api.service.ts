import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private userApiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}
}
