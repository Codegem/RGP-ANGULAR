import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { PricingsInterface } from './models/pricings';

const FallBackData = {
  sellOS: 0,
  sellRs3: 0,
  buyOS: 0,
  buyRs3: 0,
  id: '',
};

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  readonly FallBackData = FallBackData;

  pricingsData: BehaviorSubject<PricingsInterface> =
    new BehaviorSubject<PricingsInterface>(this.FallBackData);
  pricingsData$: Observable<PricingsInterface> =
    this.pricingsData.asObservable();

  constructor(public _fireBase: Firestore, private _http: HttpClient) {
    this.getPricings();
  }

  private _addPricings(value: PricingsInterface) {
    const docRef = doc(this._fireBase, 'pricings', this.pricingsData.value.id);
    setDoc(docRef, value)
      .then((response) => {
        this.getPricings();
      })
      .catch((error) => {});
  }

  private _getPricings() {
    const pricings = collection(this._fireBase, 'pricings');

    getDocs(pricings)
      .then((response) => {
        const items: any = response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        this.pricingsData.next(items[0]);
      })
      .catch((error) => {});
  }

  addPricings(value: PricingsInterface) {
    this._addPricings(value);
  }

  getPricings() {
    this._getPricings();
  }
}
