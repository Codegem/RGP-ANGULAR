import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DataManagementService } from 'src/app/_shared/data-management.service';
import { PricingsInterface } from 'src/app/_shared/models/pricings';
import { BaseComponent } from './../../components/base.component';
import { CardData } from './../../components/info-card/info-card.component';
import { TawkToService } from './../../_shared/tawk-to.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage extends BaseComponent implements OnInit {
  pricings!: PricingsInterface;
  cardData: CardData[] = [];

  constructor(
    private _tawkToService: TawkToService,
    private _dataManagementService: DataManagementService
  ) {
    super();
  }

  ngOnInit(): void {
    this._dataManagementService.pricingsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.pricings = data;
        this.addCardData();
      });
  }

  openTawkTo() {
    this._tawkToService.openTawkTo();
  }

  addCardData() {
    this.cardData = [
      {
        imageSrc: '../../assets/images/osrs.png',
        buyTitle: 'Buy Osrs',
        buyPrice: this.pricings.buyOS,
        sellTitle: 'Sell Osrs',
        sellPrice: this.pricings.sellOS,
      },
      {
        imageSrc: '../../assets/images/rs3.jpeg',
        buyTitle: 'Buy RS3',
        buyPrice: this.pricings.buyRs3,
        sellTitle: 'Sell RS3',
        sellPrice: this.pricings.sellRs3,
      },
    ];
  }
}
