import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentPlaceRoutingModule } from './current-place-routing.module';
import { CurrentPlaceComponent } from './current-place.component';

@NgModule({
	imports: [ 
		SharedModule,
		CurrentPlaceRoutingModule
	],
	declarations: [ CurrentPlaceComponent ],
	exports: [ CurrentPlaceComponent ]
})
export class CurrentPlaceModule {};