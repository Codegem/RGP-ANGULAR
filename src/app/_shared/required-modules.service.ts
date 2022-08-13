import { Injectable } from '@angular/core';

declare global {
  interface Window {
    Tawk_API: any;
    NODE_FS: any;
    require: any;
  }
}

@Injectable({ providedIn: 'root' })
export class RequiredModulesService {
  constructor() {}

  get browserWindow(): Window {
    return _window();
  }

  get fs(): any {
    return this.browserWindow.NODE_FS;
  }

  get tawk(): any {
    return this.browserWindow.Tawk_API;
  }

  get require(): any {
    return this.browserWindow.require();
  }
}

const _window = () => {
  return window;
};
