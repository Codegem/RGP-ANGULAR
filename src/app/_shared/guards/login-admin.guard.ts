import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLoginService } from './../admin-login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAdminGuard implements CanActivate {
  constructor(
    private _adminLoginService: AdminLoginService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      JSON.parse(this._adminLoginService.item) !== 'true' ||
      null ||
      undefined
    ) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
