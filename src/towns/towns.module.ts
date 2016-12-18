import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TownsComponent } from './towns.component';
import { TownsListComponent } from './towns-list.component';
import { TownsItemComponent } from './towns-item.component';
import { AddTownComponent } from './add-town.component';

@NgModule({
	imports: [ SharedModule ],
	declarations: [ 
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent
	],
	exports: [ 
		TownsComponent,
		TownsListComponent, 
		TownsItemComponent,
		AddTownComponent
	]
})
export class TownsModule {};