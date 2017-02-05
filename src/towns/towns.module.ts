import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TownsComponent } from './components/towns.component';
import { TownsListComponent } from './components/towns-list.component';
import { TownsItemComponent } from './components/towns-item.component';
import { AddTownComponent } from './components/add-town.component';
import { WeatherIconComponent } from './components/weather-icon.component';
import { WeatherWindComponent } from './components/weather-wind.component';
import { SwitchComponent } from '../shared/components/switch.component';

import { TempBgDirective } from './directives/temp-bg.directive';
import { WindDegDirective } from './directives/wind-deg.directive';
import { TownNameValidatorDirective } from '../shared/directives/town-name-validator.directive';

@NgModule({
	imports: [ SharedModule ],
	declarations: [
		TempBgDirective,
		WindDegDirective,
		TownNameValidatorDirective, 
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent,
		WeatherIconComponent,
		WeatherWindComponent,
		SwitchComponent
	],
	exports: [ 
		TempBgDirective,
		WindDegDirective,
		TownNameValidatorDirective,
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent,
		WeatherIconComponent,
		WeatherWindComponent,
		SwitchComponent
	]
})
export class TownsModule {};