import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { validateTownName } from '../validators/town-name.validator';

@Directive({
	selector: '[validateTownName][ngModel]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => TownNameValidatorDirective), multi: true }
	]
})
export class TownNameValidatorDirective implements Validator {
	validate(c: FormControl) {
		return validateTownName(c);
	}
}