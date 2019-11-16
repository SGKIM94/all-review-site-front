import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from 'hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () =>
    platformBrowserDynamic()
        .bootstrapModule(AppModule);

if (environment.hmr) {
  if (module['hot']) {
      hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR 이 webpack-dev-server 을 실행할 수 없습니다.!');
    console.log('ng server 에서 --hmr flag 를 사용한 것이 맞습니까?');
  }
}

