import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/base.component';
import { DataManagementService } from 'src/app/_shared/data-management.service';
import { PricingsInterface } from 'src/app/_shared/models/pricings';
import { AdminLoginService } from './../../_shared/admin-login.service';

type PricingForm = PricingsInterface;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css'],
})
export class AdminPage extends BaseComponent implements OnInit {
  pricings!: PricingsInterface | null;
  pricingsForm!: FormGroup;

  constructor(
    private _adminLoginService: AdminLoginService,
    private _dataManagementService: DataManagementService,
    private _fb: FormBuilder
  ) {
    super();

    this._dataManagementService.pricingsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.pricings = data;
        this.pricingsForm = this._initPricingsForm();
      });
  }

  ngOnInit(): void {}

  private _initPricingsForm() {
    return this._fb.group({
      sellOS: [this.pricings?.sellOS, Validators.required],
      sellRs3: [this.pricings?.sellRs3, Validators.required],
      buyOS: [this.pricings?.buyOS, Validators.required],
      buyRs3: [this.pricings?.buyRs3, Validators.required],
    });
  }

  getFormControl(...key: [keyof PricingForm, ...string[]]): FormControl {
    return this.pricingsForm.get(key) as FormControl;
  }

  submitPrices() {
    if (this.pricingsForm.valid) {
      this._adminLoginService.setPricings(this.pricingsForm.value);
    }
  }
}
