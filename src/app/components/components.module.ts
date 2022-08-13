import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../_shared/shared/shared.module';
import { CalculatorCardComponent } from './calculator-card/calculator-card.component';
import { FooterComponent } from './footer/footer.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PaymentsComponent } from './payments/payments.component';

const components = [
  NavBarComponent,
  InfoCardComponent,
  FooterComponent,
  PaymentsComponent,
  CalculatorCardComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule,
    NgbToastModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [...components],
  providers: [{ provide: 'Window', useValue: window }],
})
export class ComponentsModule {}
