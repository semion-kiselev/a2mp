import { Component } from '@angular/core';

@Component({
	selector: 'app-main',
	template: `
		<router-outlet name="current-place"></router-outlet>
		<router-outlet></router-outlet>
	`
})
export class MainComponent {}