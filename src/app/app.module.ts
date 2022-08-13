import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { AngularTawkModule } from 'angular-tawk';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTawkModule,
    NgbModule,
    PagesModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [NgbNavItem],
  bootstrap: [AppComponent],
})
export class AppModule {}
