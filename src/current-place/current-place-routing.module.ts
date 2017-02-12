import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentPlaceComponent } from './current-place.component';

const currentPlaceRoutes: Routes = [
	{ path: '', component: CurrentPlaceComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(currentPlaceRoutes)
	],
	exports: [
		RouterModule
	]
})
export class CurrentPlaceRoutingModule {}