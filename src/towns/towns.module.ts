import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TownsComponent } from './towns.component';
import { TownsListComponent } from './towns-list.component';
import { TownsItemComponent } from './towns-item.component';
import { AddTownComponent } from './add-town.component';
import { WeatherIconComponent } from './weather-icon.component';
import { WeatherWindComponent } from './weather-wind.component';

import { TempBgDirective } from './directives/temp-bg.directive';
import { WindDegDirective } from './directives/wind-deg.directive';

@NgModule({
	imports: [ SharedModule ],
	declarations: [
		TempBgDirective,
		WindDegDirective, 
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent,
		WeatherIconComponent,
		WeatherWindComponent
	],
	exports: [ 
		TempBgDirective,
		WindDegDirective,
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent,
		WeatherIconComponent,
		WeatherWindComponent
	]
})
export class TownsModule {};