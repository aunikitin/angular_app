import 'core-js/es6';
// для поддержки Reflect Api
import 'core-js/es7/reflect';
// zone используется angular
import 'zone.js/dist/zone';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);