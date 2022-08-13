import { Component, Input, OnInit } from '@angular/core';

export interface CardData {
  imageSrc: string;
  buyTitle: string;
  buyPrice: number;
  sellTitle: string;
  sellPrice: number;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  @Input() cardData!: CardData;

  constructor() {}

  ngOnInit(): void {}
}
