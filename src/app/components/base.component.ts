import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'app-base',
})
export class BaseComponent implements OnDestroy {
  public ngUnsubscribe = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
