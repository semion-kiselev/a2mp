import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map.component';

const townsRoutes: Routes = [
	{ path: '', component: MapComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(townsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class MapRoutingModule {}