import { Component } from '@angular/core';

import { AuthorizationService } from 'src/app/services/authorization/authorization.service';


@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

	public isShowValidationError = false;
	public email: string;
	public password: string;

	constructor(public authorizationService: AuthorizationService) { }

	logIn(): void {
		this.isShowValidationError = this.authorizationService.logIn(this.email, this.password);
	}

	closeError(): void{
		this.isShowValidationError = false;
	}

}

