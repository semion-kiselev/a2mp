import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TownWeatherEffects } from './towns/effects';
import { townWeatherReducer } from './towns/reducers';

@NgModule({
	imports: [ 
		BrowserModule, 
		CoreModule,
		StoreModule.provideStore(townWeatherReducer),
		EffectsModule.run(TownWeatherEffects)
	],
	declarations: [ 
		AppComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}