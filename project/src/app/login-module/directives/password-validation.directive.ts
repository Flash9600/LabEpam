import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[appPasswordValidation]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: PasswordValidationDirective,
		multi: true
	}]
})
export class PasswordValidationDirective {

	validate(control: AbstractControl): {[key: string]: boolean} | null {
		const password = control.value;
		const regexp = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]{4,}/);
		if (password && password.match(regexp)) {
			return null;
		}
		return { 'invalid-password': true };
	}

}
