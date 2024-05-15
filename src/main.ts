import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {persistState} from "@datorama/akita";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

persistState({
  key: 'rickandmorty',
  include: [
    'cache',
  ],
});
