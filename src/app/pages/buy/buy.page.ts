import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CalculatorCardData } from 'src/app/components/calculator-card/calculator-card.component';
import { BaseComponent } from './../../components/base.component';
import {
  AdminLoginService,
  PricingsInterface,
} from './../../_shared/admin-login.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.css'],
})
export class BuyPage extends BaseComponent implements OnInit {
  pricings!: PricingsInterface;

  cardData: CalculatorCardData[] = [];

  constructor(private _adminLoginService: AdminLoginService) {
    super();
  }

  ngOnInit(): void {
    this._adminLoginService
      .getJSON()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.pricings = data;
        this.addCardData();
      });
  }

  addCardData() {
    this.cardData.push(
      {
        imageUrl: '../../assets/images/oldschool.png',
        coficient: this.pricings.buyOS,
        isSelling: false,
      },
      {
        imageUrl: '../../assets/images/rs3full.png',
        coficient: this.pricings.buyRs3,
        isSelling: false,
      }
    );
  }
}
