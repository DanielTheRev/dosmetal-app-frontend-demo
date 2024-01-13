import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthStoreService } from './services/auth.store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  ErrorOnLogin: any = {
    message: '',
  };

  constructor(
    private FormBuilder: FormBuilder,
    private Router: Router,
    private AuthStore: AuthStoreService,
    private Title: Title
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.Title.setTitle('Iniciar sesión');
  }

  createForm(): FormGroup {
    return this.FormBuilder.group({
      UserName: [, [Validators.required]],
      Password: [, [Validators.required]],
    });
  }

  saveForm() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const user = this.form.value;
    // this.Router.navigate(['clients']);
    this.AuthStore.LoginUser(user)
      .then((res) => {
        this.Router.navigate(['home']);
      })
      .catch((error) => console.log(error));
    // this.CaseManagerApi.Login(user).subscribe((res: any) => {
    //   localStorage.setItem('cc', res.token);
    //   this.Router.navigate(['whatsappbot'])
    // }, (error: any) => {
    //   console.log(error);
    //   // this.ErrorOnLogin.message = error.error.error
    // });
  }
}
