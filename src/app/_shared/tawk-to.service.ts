import { Injectable } from '@angular/core';
import { RequiredModulesService } from './required-modules.service';

@Injectable({
  providedIn: 'root',
})
export class TawkToService {
  constructor(private _requiredModulesService: RequiredModulesService) {}

  openTawkTo() {
    this._requiredModulesService.tawk.toggle();
  }
}
