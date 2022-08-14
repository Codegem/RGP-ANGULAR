import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataManagementService } from './data-management.service';
import { CustomError } from './models/errors';
import { PricingsInterface } from './models/pricings';
import { LoginForm } from './models/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  item!: string;
  logedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.logedIn.asObservable();
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private _router: Router,
    private _auth: Auth,
    private _dataManagementService: DataManagementService
  ) {
    this.getStorageItems();
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        this.user.next(user);
        this.logedIn.next(true);
      } else {
        this.logedIn.next(false);
      }
    });
  }

  getStorageItems() {
    this.item = JSON.stringify(localStorage.getItem(environment.KEY));
  }

  setPricings(value: PricingsInterface) {
    this._saveToDB(value);
  }

  private _saveToDB(value: PricingsInterface) {
    this._dataManagementService.addPricings(value);
  }

  public login(value: LoginForm): Promise<any> {
    return this._login(value);
  }

  private _login(value: LoginForm): Promise<any> {
    return signInWithEmailAndPassword(this._auth, value.email, value.password)
      .then((res) => {
        this.user.next(res.user);
        this.logedIn.next(true);
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.user.next(null);
        this.logedIn.next(false);
        this._router.navigate(['']);
      })
      .catch((error) => {
        // An error happened.
      });
  }
}

export const handleError = (error: CustomError) => {
  return error.message;
};
