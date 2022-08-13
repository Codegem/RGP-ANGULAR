import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequiredModulesService } from './required-modules.service';

export interface PricingsInterface {
  sellOS: number;
  sellRs3: number;
  buyOS: number;
  buyRs3: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  private dbUrl = environment.DB_URL;

  item!: string;
  pricings!: PricingsInterface;

  constructor(
    private _http: HttpClient,
    private _requiredModulesService: RequiredModulesService
  ) {
    this.getStorageItems();
    this.getJSON().subscribe((data) => {
      this.pricings = data;
    });
  }

  getStorageItems() {
    this.item = JSON.stringify(localStorage.getItem(environment.KEY));
  }

  setPricings(value: PricingsInterface) {
    this._saveToDB(value);
  }

  getJSON(): Observable<PricingsInterface> {
    return this._http.get<PricingsInterface>(this.dbUrl);
  }

  private _saveToDB(value: PricingsInterface) {}
}
