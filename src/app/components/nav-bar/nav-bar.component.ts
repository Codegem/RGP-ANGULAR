import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AngularTawkComponent } from 'angular-tawk';
import { BehaviorSubject, filter, Observable, takeUntil } from 'rxjs';
import { AdminLoginService } from './../../_shared/admin-login.service';
import { TawkToService } from './../../_shared/tawk-to.service';
import { BaseComponent } from './../base.component';

interface NavElements {
  title: string;
  url: string;
}

enum NavItems {
  Home = 'Home',
  Contact = 'Contact',
  Buy = 'Buy',
  Sell = 'Sell',
  Login = 'Login',
}

const NavBarElements: NavElements[] = [
  { title: NavItems.Home, url: '/' },
  { title: NavItems.Contact, url: '' },
  { title: NavItems.Buy, url: '/buy' },
  { title: NavItems.Sell, url: '/sell' },
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends BaseComponent implements OnInit {
  @ViewChild('angular-tawk') tawkTo: AngularTawkComponent | undefined;

  isExpanded!: boolean;

  activatedUrl: BehaviorSubject<string> = new BehaviorSubject('');
  activatedUrl$: Observable<string> = this.activatedUrl.asObservable();

  public navElements = NavBarElements;
  readonly NavItems = NavItems;

  constructor(
    private _router: Router,
    public adminService: AdminLoginService,
    private _tawkService: TawkToService
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
    this.showLogin();
  }

  showLogin() {
    if (JSON.parse(this.adminService.item) === 'true') {
      this.navElements = [
        ...this.navElements,
        { title: NavItems.Login, url: '/login' },
      ];
    }
  }

  toggleTawk(): void {
    this._tawkService.openTawkTo();
  }
}
