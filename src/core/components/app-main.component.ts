import { Component } from '@angular/core';

@Component({
	selector: 'app-main',
	template: `
		<h1 class="root__title">Weather in the nearest towns</h1>
	    <div class="root__towns">
    		<towns></towns>
	    </div>
	    <div class="root__town-weather">
			<town-weather></town-weather>
	    </div>
	    <div class="root__map">
	    	<map></map>
	    </div>
	`
})
export class MainComponent {}