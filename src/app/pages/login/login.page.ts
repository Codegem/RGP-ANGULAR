import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginForm } from 'src/app/_shared/models/user-auth';
import { AdminLoginService } from './../../_shared/admin-login.service';

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
    private _fb: FormBuilder,
    private _adminLoginService: AdminLoginService,
    private _router: Router
  ) {
    this.loginForm = this.initLoginForm();
  }

  ngOnInit(): void {}

  initLoginForm() {
    return this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getFormControl(...key: [keyof LoginForm, ...string[]]): FormControl {
    return this.loginForm.get(key) as FormControl;
  }

  login(value: LoginForm) {
    this._adminLoginService
      .login(value)
      .then((res) => {
        if (!res) {
          this.showLoginError.next(true);
        } else {
          this._router.navigate(['/admin']);
        }
      })
      .catch((err) => {
        this.showLoginError.next(true);
      });
  }

  validateLogin() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    }
  }
}
