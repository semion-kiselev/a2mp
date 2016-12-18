import './app-header.component.scss';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-header',
	template: `
		<header class="b-app-header">Sample Header</header>
	`
})
export class HeaderComponent {};