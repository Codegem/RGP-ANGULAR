import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  AdminLoginService,
  PricingsInterface,
} from 'src/app/_shared/admin-login.service';
import { BaseComponent } from './../../components/base.component';
import { CalculatorCardData } from './../../components/calculator-card/calculator-card.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.css'],
})
export class SellPage extends BaseComponent implements OnInit {
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
        coficient: this.pricings.sellOS,
        isSelling: true,
      },
      {
        imageUrl: '../../assets/images/rs3full.png',
        coficient: this.pricings.sellRs3,
        isSelling: true,
      }
    );
  }
}
