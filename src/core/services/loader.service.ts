import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

Injectable()
export class LoaderService {
	public loading$: Observable<boolean>;
	private _observer: Observer<boolean>;

	constructor() {
		this.loading$ = Observable.create((observer: Observer<boolean>) => this._observer = observer).share();
	}

	toggle(value: boolean): void {
		if (this._observer) {
			this._observer.next(value);
		}
	}
}