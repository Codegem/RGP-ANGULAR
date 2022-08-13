import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentsList: String[] = [
    '../../assets/payments/visacard.png',
    '../../assets/payments/mastercard.png',
    '../../assets/payments/revolut.png',
    '../../assets/payments/monese.png',
    '../../assets/payments/skrill.png',
    '../../assets/payments/btc.png',
    '../../assets/payments/ethereum.png',
  ];

  constructor() {}

  ngOnInit(): void {}
}
