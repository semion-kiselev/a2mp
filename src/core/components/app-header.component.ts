import './app-header.component.scss';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-header',
	template: `
		<header class="b-app-header">
			<nav class="app-header__nav">
				<a class="app-header__nav-link" routerLink="/towns" routerLinkActive="--active">Towns</a>
				<a class="app-header__nav-link" routerLink="/map" routerLinkActive="--active">Map</a>
				<button 
					[ngClass]="{'app-header__widget-trigger': true, '--active': widgetIsActivated}"
					(click)="onClickWidgetTrigger()"
				>
					My current place
				</button>
			</nav>
		</header>
	`
})
export class HeaderComponent implements OnInit {
	private widgetIsActivated: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.url.subscribe((url: UrlSegment[]) => {
			// didn't understand how to get full url by angular router
			if (window.location.href.indexOf('(current-place:current-place)') > -1) {
				this.widgetIsActivated = true;
			}
		});
	}

	onClickWidgetTrigger() {
		if (this.widgetIsActivated) {
			this.widgetIsActivated = false;
			this.router.navigate([{ outlets: { 'current-place': null } }]);
		} else {
			this.widgetIsActivated = true;
			this.router.navigate([{ outlets: { 'current-place': ['current-place'] } }]);
		}
	}
};