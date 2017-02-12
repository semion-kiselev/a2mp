import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TownsComponent } from './components/towns.component';
import { TownDetailComponent } from './components/town-detail.component';

import { TownDetailResolver } from './town-detail-resolver.service';

const townsRoutes: Routes = [
	{ 
		path: 'towns',
		component: TownsComponent,
		children: [
			{ 
				path: ':id',
				component: TownDetailComponent,
				resolve: {
					townWeatherData: TownDetailResolver
				}
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(townsRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		TownDetailResolver
	]
})
export class TownsRoutingModule {}