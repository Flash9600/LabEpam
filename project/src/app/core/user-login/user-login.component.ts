import { Component, ViewChild, ElementRef } from '@angular/core';

import { AuthorizationService } from '../../static/services/authorization/authorization.service';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

	public isShowValidationError = false;
	public isShowUserLogin = true;

	constructor(public authorizationService: AuthorizationService) { }

	@ViewChild('emailInput') emailElement: ElementRef;
	@ViewChild('pasInput') passwordElement: ElementRef;

	logIn(): void {
		const email: string = this.emailElement.nativeElement.value;
		const password: string = this.passwordElement.nativeElement.value;
		this.isShowValidationError = this.authorizationService.logIn(email, password);
		if (!this.isShowValidationError) {
			this.isShowUserLogin = false;
		}
	}

	closeError(): void{
		this.isShowValidationError = false;
	}

}

