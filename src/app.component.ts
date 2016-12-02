import './shared/styles/common.scss';
import './shared/styles/root.scss';

import { Component } from '@angular/core';  

@Component({
	selector: 'app',
	template: `
		<div class="b-root">
			<div class="root__header">
				<app-header></app-header>
			</div>
			<div class="root__main">
				<app-main></app-main>
			</div>
		    <div class="root__footer">
				<app-footer></app-footer>
		    </div>
	  	</div>
	`
})
export class AppComponent {}