import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from './../../interfaces/userEntity.interface';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy{

	public user: User;
	public isShowError: boolean;
	public ValidationErrorText: string;
	protected subscription: Subscription;

	constructor(protected authorizationService: AuthorizationService) { }

	ngOnInit(): void{
		this.user = new User({
			email: '',
			password: ''
		});
		this.authorizationService.loginTracker.next(null);
		this.subscription = this.authorizationService.validationErrorTextTracker.subscribe((text) => {
			this.ValidationErrorText = text;
		});
	}

	login(): void {
		this.authorizationService.loginTracker.next(this.user);
	}

	closeError(): void{
		this.authorizationService.validationErrorTextTracker.next('');
	}

	ngOnDestroy(): void{
		this.subscription.unsubscribe();
	}

}

