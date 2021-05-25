import { Component } from '@angular/core';

import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';


@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

	public email: string;
	public password: string;

	constructor(protected authorizationService: AuthorizationService) { }

	login(): void {
		this.authorizationService.login(this.email, this.password);
	}

	get isShowValidationError(): string{
		return	this.authorizationService.validationErrorText;
	}

	closeError(): void{
		this.authorizationService.toggleValidationError('');
	}

}

