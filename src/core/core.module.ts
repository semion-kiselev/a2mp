import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TownsModule } from '../towns/towns.module';
import { CurrentPlaceModule } from '../current-place/current-place.module';

import { AppRoutingModule, CustomPreloadingStrategy } from '../app-routing.module';

import { HeaderComponent } from './components/app-header.component';
import { FooterComponent } from './components/app-footer.component';
import { MainComponent } from './components/app-main.component';

import { GeoPositionService } from './services/geo-position.service';
import { GoogleMapsService } from './services/google-maps.service';
import { OpenWeatherService } from './services/open-weather.service';
import { LoggerService, loggerFactory } from './services/logger.service';
import { requestOptionsProvider } from './services/default-request-options.service';

@NgModule({
	imports: [ 
		CommonModule,
		CurrentPlaceModule,
		TownsModule,
		AppRoutingModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		MainComponent
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		MainComponent
	],
	providers: [
		GeoPositionService,
		GoogleMapsService,
		OpenWeatherService,
		CustomPreloadingStrategy,
		{ provide: LoggerService, useFactory: loggerFactory },
		requestOptionsProvider
	]
})
export class CoreModule {};