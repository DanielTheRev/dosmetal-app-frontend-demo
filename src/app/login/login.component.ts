import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthStoreService } from './services/auth.store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  ErrorOnLogin: { message: string } | undefined = {
    message: 'Esto es un error',
  };

  constructor(
    private FormBuilder: FormBuilder,
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

  async saveForm() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const user = this.form.value;
    this.AuthStore.LoginUser(user);
  }
}
