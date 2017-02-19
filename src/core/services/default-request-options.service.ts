import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
	constructor() {
		super();

		this.headers.set('Accept', '*/*');
	}
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
