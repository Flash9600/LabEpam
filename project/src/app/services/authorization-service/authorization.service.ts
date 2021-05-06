import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from './../http-service/http.service';
import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class AuthorizationService {

	constructor(protected storageService: StorageService, protected router: Router, protected http: HttpService) { }

	protected userName = 'user';

	public validationErrorText: string;

	public get isLogin(): boolean {
		return !!this.storageService.getValue<User | undefined>(this.userName);
	}

	public toggleValidationError(errorText: string): void{
		this.validationErrorText = errorText;
	}

	protected isValidData(user: User): boolean {
		const {email, password} = user;
		const regexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
		return !!(email && email.match(regexp) && password.length > 3);
	}

	protected subscribeAuthorization(user: User): void{
			this.http.makeAuthorization(user).subscribe(
				() => {
				console.log('Authorized is successfully');
				this.storageService.setValue<User>(this.userName, user);
				this.router.navigateByUrl('courses');
			},
			(err) => {
				this.toggleValidationError(err);
				console.log('isValidDataERROR:', err);
		});
	}

	public login(email: string, password: string): void {
		const user = new User({
			email,
			password
		});
		if (this.isValidData(user)) {
			this.subscribeAuthorization(user);
		} else {
			const errorText = 'Invalid input value';
			this.toggleValidationError(errorText);
		}
	}

	public createToken(): boolean | Observable<boolean>{
		if (!this.http.getToken) {
			const user = this.storageService.getValue<User | undefined>(this.userName);
			return this.http.logInUser(user);
		} else {
			return true;
		}
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
	}

	public getUserInfo(): string {
		if (this.isLogin) {
			return this.storageService.getValue<User>(this.userName).email;
		}
		return '';
	}


}
