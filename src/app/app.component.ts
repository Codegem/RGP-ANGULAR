import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rune-gp';
  tawkId: string = environment.TAWK_KEY;
  process = GlobalConstants.process;
}

export class GlobalConstants {
  public static process: any = {
    env: {
      NODE_ENV: 'development',
    },
  };
}
