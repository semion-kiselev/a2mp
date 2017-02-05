import { FormControl } from '@angular/forms';

export function validateTownName(c: FormControl) : {[key: string]: boolean} {
	let TOWN_REGEXP = new RegExp('^[a-zA-Z][a-zA-Z-\s]+$');

	return TOWN_REGEXP.test(c.value) ? null : { 'invalidTownName': true };
}