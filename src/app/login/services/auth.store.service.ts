import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Router } from '@angular/router';

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

  constructor(
    private AuthService: AuthService,
    private NotificationService: NotificationsService,
    private Router: Router
  ) {}

  _setUser(user: { UserName: string; Name: string; Gender: string }) {
    this._UserSource.next(user);
  }

  LoginUser(user: { UserName: string; Password: string }) {
    return this.AuthService.Login(user).subscribe({
      next: (res) => {
        this._setUser(res);
        localStorage.setItem('cc', res.token);
        this.NotificationService.requestSuccessful('Bienvenido');
        this.Router.navigate(['Home']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 402) {
          this.NotificationService.requestError(err.error.message);
          return;
        }
        this.NotificationService.requestError(
          'Hubo un error de conexión con el servidor'
        );
      },
    });
  }

  logOut() {
    localStorage.removeItem('cc');
    this.Router.navigate(['auth']);
  }
}
