import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'; 

import { SpinnerComponent } from './components/spinner.component';
import { AlertComponent } from './components/alert.component';
import { PaginatorComponent } from './components/paginator.component';

import { KelvinToCelciusPipe } from './pipes/kelvin-to-celsius.pipe';

@NgModule({
	imports: [CommonModule, HttpModule],
	declarations: [
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		KelvinToCelciusPipe
	],
	exports: [
		CommonModule,
		HttpModule,
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		KelvinToCelciusPipe
	]
})
export class SharedModule {}