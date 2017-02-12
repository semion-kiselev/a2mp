import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MapModule } from '../map/map.module';
import { TownsModule } from '../towns/towns.module';
// import { CurrentPlaceModule } from '../current-place/current-place.module';

import { AppRoutingModule, CustomPreloadingStrategy } from '../app-routing.module';

import { HeaderComponent } from './components/app-header.component';
import { FooterComponent } from './components/app-footer.component';
import { MainComponent } from './components/app-main.component';

import { GeoPositionService } from './services/geo-position.service';
import { GoogleMapsService } from './services/google-maps.service';
import { OpenWeatherService } from './services/open-weather.service';
// import { LoaderService } from './services/loader.service';
// import { LoggerService, loggerFactory } from './services/logger.service';

@NgModule({
	imports: [ 
		CommonModule,
		// CurrentPlaceModule, 
		// MapModule,
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
		CustomPreloadingStrategy
		// LoaderService,
		// { provide: LoggerService, useFactory: loggerFactory }
	]
})
export class CoreModule {};