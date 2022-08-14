import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CalculatorCardData } from 'src/app/components/calculator-card/calculator-card.component';
import { DataManagementService } from 'src/app/_shared/data-management.service';
import { PricingsInterface } from 'src/app/_shared/models/pricings';
import { BaseComponent } from './../../components/base.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.css'],
})
export class BuyPage extends BaseComponent implements OnInit {
  pricings!: PricingsInterface;

  cardData: CalculatorCardData[] = [];

  constructor(private _dataManagementService: DataManagementService) {
    super();
  }

  ngOnInit(): void {
    this._dataManagementService.pricingsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.pricings = data;
        this.addCardData();
      });
  }

  addCardData() {
    this.cardData = [
      {
        imageUrl: '../../assets/images/oldschool.png',
        coficient: this.pricings.buyOS,
        isSelling: false,
      },
      {
        imageUrl: '../../assets/images/rs3full.png',
        coficient: this.pricings.buyRs3,
        isSelling: false,
      },
    ];
  }
}
