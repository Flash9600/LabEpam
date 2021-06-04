import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
	selector: '[appEmailValidation]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: EmailValidationDirective,
		multi: true,
	}]
})
export class EmailValidationDirective implements Validator{

	validate(control: AbstractControl): {[key: string]: boolean} | null {
		const email = control.value;
		const regexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
		if (email && email.match(regexp)) {
			return null;
		}
		return {invalidEmail: true };
	}

}
