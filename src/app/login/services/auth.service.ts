import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = `${environment.server_uri}/auth`;

  constructor(private _http: HttpClient) {}

  Login(user: any) {
    return this._http.post<{
      UserName: string;
      Name: string;
      Gender: string;
      token: string;
    }>(`${this.apiURL}/logIn`, user);
  }

  getUserProfile() {
    return this._http.get<{ Name: string; UserName: string; Gender: string }>(
      `${this.apiURL}/getUserProfile`
    );
  }

  VerifyUserToken() {
    const token = localStorage.getItem('cc');
    return this._http.post<{
      valid: boolean;
      user: { Name: string; Gender: string; UserName: string };
    }>(`${this.apiURL}/verify`, {
      token,
    });
  }
}
