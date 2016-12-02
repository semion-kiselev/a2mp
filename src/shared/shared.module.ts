import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './components/spinner.component';
import { AlertComponent } from './components/alert.component';
import { PaginatorComponent } from './components/paginator.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent
	],
	exports: [
		CommonModule,
		SpinnerComponent,
		AlertComponent,
		PaginatorComponent
	]
})
export class SharedModule {}