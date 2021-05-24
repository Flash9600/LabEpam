import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[appEmailValidation]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: EmailValidationDirective,
		multi: true,
	}]
})
export class EmailValidationDirective {

	validate(control: AbstractControl): {[key: string]: boolean} | null {
		const email = control.value;
		const regexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
		if (email && email.match(regexp)) {
			return null;
		}
		return { 'invalid-Email': true };
	}

}
