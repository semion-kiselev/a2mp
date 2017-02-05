import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'; 
import { FormsModule } from '@angular/forms'; 

import { SpinnerComponent } from './components/spinner.component';
import { AlertComponent } from './components/alert.component';
import { PaginatorComponent } from './components/paginator.component';
import { FormErrorsComponent } from './components/form-errors.component';

import { KelvinToCelciusPipe } from './pipes/kelvin-to-celsius.pipe';

import { WaitDirective } from './directives/wait.directive';

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
		KelvinToCelciusPipe,
		WaitDirective
	],
	exports: [
		CommonModule,
		HttpModule,
		FormsModule,
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent,
		FormErrorsComponent,
		KelvinToCelciusPipe,
		WaitDirective
	]
})
export class SharedModule {}