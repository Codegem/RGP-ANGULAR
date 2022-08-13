import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from './../../../environments/environment';
import { AdminLoginService } from './../../_shared/admin-login.service';

export interface LoginForm {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.validateLogin();
    }
  }

  loginForm!: FormGroup;
  showLoginError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _adminLoginService: AdminLoginService
  ) {
    this.loginForm = this.initLoginForm();
  }

  ngOnInit(): void {}

  initLoginForm() {
    return this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getFormControl(...key: [keyof LoginForm, ...string[]]): FormControl {
    return this.loginForm.get(key) as FormControl;
  }

  login() {
    this._router.navigate(['/admin']);
  }

  validateLogin() {
    if (
      this.loginForm.value['username'] === environment.SECRET_LOGIN &&
      this.loginForm.value['password'] === environment.SECRET_PASSWORD
    ) {
      this.login();
    }
    this.showLoginError.next(true);
    return;
  }
}
