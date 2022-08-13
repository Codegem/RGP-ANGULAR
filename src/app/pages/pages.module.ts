import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AdminPage } from './admin/admin.page';
import { BuyPage } from './buy/buy.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { SellPage } from './sell/sell.page';

const components = [HomePage, BuyPage, SellPage];

@NgModule({
  declarations: [...components, AdminPage, LoginPage],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
  exports: [...components],
})
export class PagesModule {}
