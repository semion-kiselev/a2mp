import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'; 
import { FormsModule } from '@angular/forms'; 

import { SpinnerComponent } from './components/spinner.component';
import { AlertComponent } from './components/alert.component';
import { PaginatorComponent } from './components/paginator.component';
import { FormErrorsComponent } from './components/form-errors.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { WeatherIconComponent } from './components/weather-icon.component';
import { WeatherWindComponent } from './components/weather-wind.component';

import { KelvinToCelciusPipe } from './pipes/kelvin-to-celsius.pipe';

import { WaitDirective } from './directives/wait.directive';
import { TempBgDirective } from './directives/temp-bg.directive';
import { WindDegDirective } from './directives/wind-deg.directive';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		FormsModule
	],
	declarations: [
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		FormErrorsComponent,
		PageNotFoundComponent,
		WeatherIconComponent,
		WeatherWindComponent,
		KelvinToCelciusPipe,
		WaitDirective,
		TempBgDirective,
		WindDegDirective
	],
	exports: [
		CommonModule,
		HttpModule,
		FormsModule,
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		FormErrorsComponent,
		PageNotFoundComponent,
		WeatherIconComponent,
		WeatherWindComponent,
		KelvinToCelciusPipe,
		WaitDirective,
		TempBgDirective,
		WindDegDirective
	]
})
export class SharedModule {}