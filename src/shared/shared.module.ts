import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'; 

import { SpinnerComponent } from './components/spinner.component';
import { AlertComponent } from './components/alert.component';
import { PaginatorComponent } from './components/paginator.component';

import { KelvinToCelciusPipe } from './pipes/kelvin-to-celsius.pipe';

import { WaitDirective } from './directives/wait.directive';

@NgModule({
	imports: [CommonModule, HttpModule],
	declarations: [
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		KelvinToCelciusPipe,
		WaitDirective
	],
	exports: [
		CommonModule,
		HttpModule,
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		KelvinToCelciusPipe,
		WaitDirective
	]
})
export class SharedModule {}