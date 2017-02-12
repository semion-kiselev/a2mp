import './page-not-found.component.scss';
import { Component } from '@angular/core';
 
@Component({
	template: `
		<div class="b-not-found">
			<alert 
				type="warn" 
				message="Page Not Found"
			></alert>
		</div>
	`
})
export class PageNotFoundComponent {

}