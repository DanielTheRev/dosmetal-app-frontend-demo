import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly _UserSource = new BehaviorSubject<{
    UserName: string;
    Name: string;
    Gender: string;
  }>({
    UserName: '',
    Name: '',
    Gender: '',
  });
  readonly Auth$ = this._UserSource.asObservable();

  constructor(private AuthService: AuthService) {
  }

  _setUser(user: { UserName: string; Name: string; Gender: string }) {
    this._UserSource.next(user);
  }

  LoginUser(user: { UserName: string; Password: string }) {
    return new Promise((Resolve, Reject) => {
      this.AuthService.Login(user).subscribe({
        next: (res) => {
          this._setUser(res);
          localStorage.setItem('cc', res.token);
          return Resolve({ message: `Bienvenido ${res.Name}` });
        },
        error: (err: HttpErrorResponse) => Reject(err.error.message),
      });
    });
  }
}
