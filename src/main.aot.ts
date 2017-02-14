import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Rx';

import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);