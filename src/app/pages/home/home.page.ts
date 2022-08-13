import { Component, OnInit } from '@angular/core';
import { CardData } from './../../components/info-card/info-card.component';
import { TawkToService } from './../../_shared/tawk-to.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  cardData: CardData[] = [
    {
      imageSrc: '../../assets/images/osrs.png',
      buyTitle: 'Buy Osrs',
      buyPrice: 0.36,
      sellTitle: 'Sell Osrs',
      sellPrice: 0.26,
    },
    {
      imageSrc: '../../assets/images/rs3.jpeg',
      buyTitle: 'Buy RS3',
      buyPrice: 0.36,
      sellTitle: 'Sell RS3',
      sellPrice: 0.26,
    },
  ];

  constructor(private _tawkToService: TawkToService) {}

  ngOnInit(): void {}

  openTawkTo() {
    this._tawkToService.openTawkTo();
  }
}
