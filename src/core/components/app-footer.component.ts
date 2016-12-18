import './app-footer.component.scss';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-footer',
	template: `
		<footer class="b-app-footer">Sample Footer</footer>
	`
})
export class FooterComponent {};