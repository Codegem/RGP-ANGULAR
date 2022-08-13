import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseComponent } from './../base.component';

export interface CalculatorCardData {
  imageUrl: string;
  coficient: number;
  isSelling: boolean;
}

export interface CalculatorForm {
  gp: number;
  price: number;
}

@Component({
  selector: 'app-calculator-card',
  templateUrl: './calculator-card.component.html',
  styleUrls: ['./calculator-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export class CalculatorCardComponent extends BaseComponent implements OnInit {
  @Input() cardData!: CalculatorCardData;

  calculatorForm!: FormGroup;
  changeControls: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _number: DecimalPipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.calculatorForm = this.initCalculatorForm();
    this.changeControls = this.cardData.isSelling;

    const gpControl = this.getFormControl('gp');
    const priceControl = this.getFormControl('price');

    priceControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        if (!this.changeControls) {
          this.calculationHandler(val, gpControl);
        }
      });

    gpControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        if (this.changeControls) {
          this.calculationHandler(val, priceControl);
        }
      });
  }

  initCalculatorForm() {
    return this._fb.group({
      gp: [null, Validators.maxLength(10)],
      price: [null, Validators.maxLength(10)],
    });
  }

  getFormControl(...key: [keyof CalculatorForm, ...string[]]): FormControl {
    return this.calculatorForm.get(key) as FormControl;
  }

  calculationHandler(val: number, control: FormControl) {
    if (!control) {
      return;
    }

    if (val) {
      const calculated: number = this.changeControls
        ? val * this.cardData.coficient
        : val / this.cardData.coficient;
      control.setValue(calculated.toFixed(2));
    } else {
      control.reset(null);
    }
    this._cdr.markForCheck();
  }

  toggleControls() {
    this.changeControls = !this.changeControls;
    this.calculatorForm.updateValueAndValidity();
    this._cdr.markForCheck();
  }
}
