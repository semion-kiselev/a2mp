import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TownsComponent } from './towns.component';
import { TownsItemComponent } from './towns-item.component';

@NgModule({
	imports: [ SharedModule ],
	declarations: [ TownsComponent, TownsItemComponent ],
	exports: [ TownsComponent, TownsItemComponent ]
})
export class TownsModule {};