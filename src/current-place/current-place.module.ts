import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentPlaceComponent } from './current-place.component';

@NgModule({
	imports: [ 
		SharedModule
	],
	declarations: [ CurrentPlaceComponent ],
	exports: [ CurrentPlaceComponent ]
})
export class CurrentPlaceModule {};