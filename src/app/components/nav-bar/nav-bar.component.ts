import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AngularTawkComponent } from 'angular-tawk';
import { BehaviorSubject, filter, Observable, takeUntil } from 'rxjs';
import { AdminLoginService } from './../../_shared/admin-login.service';
import { TawkToService } from './../../_shared/tawk-to.service';
import { BaseComponent } from './../base.component';

interface NavElements {
  title: string;
  url: string | null;
}

enum NavItems {
  Home = 'Home',
  Contact = 'Contact',
  Buy = 'Buy',
  Sell = 'Sell',
  Login = 'Login',
  Admin = 'Admin',
}

const NavBarElements: NavElements[] = [
  { title: NavItems.Home, url: '/' },
  { title: NavItems.Contact, url: null },
  { title: NavItems.Buy, url: '/buy' },
  { title: NavItems.Sell, url: '/sell' },
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent extends BaseComponent implements OnInit {
  @ViewChild('angular-tawk') tawkTo: AngularTawkComponent | undefined;

  isExpanded!: boolean;

  activatedUrl: BehaviorSubject<string> = new BehaviorSubject('');
  activatedUrl$: Observable<string> = this.activatedUrl.asObservable();

  public navElements = NavBarElements;
  readonly defaultNavElements = NavBarElements;
  readonly NavItems = NavItems;

  constructor(
    private _router: Router,
    public adminService: AdminLoginService,
    private _tawkService: TawkToService,
    private _cdr: ChangeDetectorRef
  ) {
    super();

    this._router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.activatedUrl.next(event.url);
      });
  }

  ngOnInit(): void {
    this.adminService.isLoggedIn$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.navElements = this.defaultNavElements;
        this.showLogin(res);
      });
  }

  showLogin(show: boolean) {
    if (JSON.parse(this.adminService.item) === 'true') {
      let authItem: NavElements = show
        ? { title: NavItems.Admin, url: '/admin' }
        : { title: NavItems.Login, url: '/login' };
      this.navElements = [...this.navElements, authItem];
      this._cdr.markForCheck();
    }
  }

  toggleTawk(): void {
    this._tawkService.openTawkTo();
  }
}
