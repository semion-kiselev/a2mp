import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TownsRoutingModule } from './towns-routing.module';

import { TownsComponent } from './components/towns.component';
import { TownsListComponent } from './components/towns-list.component';
import { TownsItemComponent } from './components/towns-item.component';
import { TownDetailComponent } from './components/town-detail.component';
import { AddTownComponent } from './components/add-town.component';

import { SwitchComponent } from '../shared/components/switch.component';


import { TownNameValidatorDirective } from '../shared/directives/town-name-validator.directive';

@NgModule({
	imports: [ 
		SharedModule,
		TownsRoutingModule
	],
	declarations: [		
		TownNameValidatorDirective, 
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		TownDetailComponent,
		AddTownComponent,		
		SwitchComponent
	],
	exports: [ 
		TownNameValidatorDirective,
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		TownDetailComponent,
		AddTownComponent,
		SwitchComponent
	]
})
export class TownsModule {};