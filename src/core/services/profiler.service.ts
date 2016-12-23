import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ProfilerService {
	private onZoneStableSub: Subscription;
  	private onZoneUnstableSub: Subscription;
  	private firstLog: boolean = true;

  	constructor(private ngZone: NgZone) {
  		this.onZoneStableSub = this.ngZone.onStable.subscribe(this.onZoneStable.bind(this));
    	this.onZoneUnstableSub = this.ngZone.onUnstable.subscribe(this.onZoneUnstable.bind(this));
  	}

  	onZoneStable(): void {
  		if (this.firstLog) {
  			this.firstLog = false;
  			return;
  		}
  		console.log('Profiler: CD Tree Stable');
		console.timeEnd('Profiler: Time for CD Tree to stabilize');
  	}

  	onZoneUnstable(): void {
  		console.log('Profiler: CD Tree Unstable');
  		console.time('Profiler: Time for CD Tree to stabilize');
  	}

  	ngOnDestroy() {
    	this.onZoneStableSub.unsubscribe();
    	this.onZoneUnstableSub.unsubscribe();
    }
}