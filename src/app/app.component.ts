import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/services/auth.service';
import { AuthStoreService } from './login/services/auth.store.service';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'dosmetal-app-frontend';
  GoToHome = false;
  showErrorMsg: boolean = false;
  @ViewChild('appLoader') appLoader!: ElementRef<HTMLDivElement>;
  constructor(
    private AuthService: AuthService,
    private Router: Router,
    private AuthStore: AuthStoreService,
    private NotificationService: NotificationsService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.appLoader.nativeElement === undefined) return;
      this.appLoader.nativeElement.classList.remove('animate__fadeIn');
      this.AuthService.VerifyUserToken().subscribe({
        next: (res) => {
          setTimeout(() => {
            this.appLoader.nativeElement.classList.add('animate__fadeOut');
            this.appLoader.nativeElement.addEventListener(
              'animationend',
              () => {
                this.AuthStore._setUser(res.user);
                this.GoToHome = res.valid;
                this.NotificationService.requestSuccessful(
                  `Bienvenido de nuevo, ${res.user.Name}`
                );
              }
            );
          }, 1000);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            setTimeout(() => {
              this.appLoader.nativeElement.classList.add('animate__fadeOut');
              this.appLoader.nativeElement.addEventListener(
                'animationend',
                () => {
                  this.NotificationService.requestSuccessful(
                    'Sesión expirada, vuelva a iniciar sesión'
                  );
                  this.GoToHome = true;
                  this.Router.navigate(['auth']);
                }
              );
            }, 500);
            return;
          }
          this.showErrorMsg = true;
          return;
        },
      });
    }, 500);

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (ev) => {
        const { target } = ev as any;
        if (target.matches) {
          document.documentElement.setAttribute('data-bs-theme', 'dark');
          return;
        }
        document.documentElement.setAttribute('data-bs-theme', 'light');
      });
  }
}
