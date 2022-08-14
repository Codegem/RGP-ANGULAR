import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseComponent } from './components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  tawkId: string = environment.TAWK_KEY;

  constructor() {
    super();
  }
}
