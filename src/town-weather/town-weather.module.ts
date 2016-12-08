import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TownWeatherComponent } from './town-weather.component';
import { TownWeatherPipe } from './town-weather.pipe';

@NgModule({
	imports: [ SharedModule ],
	declarations: [ 
		TownWeatherComponent, 
		TownWeatherPipe 
	],
	exports: [ 
		TownWeatherComponent, 
		TownWeatherPipe
	]
})
export class TownWeatherModule {};