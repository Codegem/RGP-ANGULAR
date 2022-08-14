import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './pages/admin/admin.page';
import { BuyPage } from './pages/buy/buy.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SellPage } from './pages/sell/sell.page';
import { AdminGuard } from './_shared/guards/admin.guard';
import { LoginAdminGuard } from './_shared/guards/login-admin.guard';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'buy', component: BuyPage },
  { path: 'sell', component: SellPage },
  { path: 'login', component: LoginPage, canActivate: [LoginAdminGuard] },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
