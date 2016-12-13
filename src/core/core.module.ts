import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from '../map/map.module';
import { TownsModule } from '../towns/towns.module';
import { TownWeatherModule } from '../town-weather/town-weather.module';

import { HeaderComponent } from './components/app-header.component';
import { FooterComponent } from './components/app-footer.component';
import { MainComponent } from './components/app-main.component';

import { GeoPositionService } from './services/geo-position.service';
import { GoogleMapsService } from './services/google-maps.service';
import { OpenWeatherService } from './services/open-weather.service';
import { LoaderService } from './services/loader.service';

@NgModule({
	imports: [ 
		CommonModule, 
		MapModule,
		TownsModule,
		TownWeatherModule 
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
		LoaderService
	]
})
export class CoreModule {};