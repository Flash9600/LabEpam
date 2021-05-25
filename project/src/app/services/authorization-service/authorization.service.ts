import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { HttpService } from './../http-service/http.service';
import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class AuthorizationService {

	public userEmailTracker: Subject<string>;
	public userName: string;
	public validationErrorText: string;


	constructor(
		protected storageService: StorageService,
		protected router: Router,
		protected network: HttpService) {
			this.userEmailTracker = new Subject<string>();
			this.userName = 'user';

		}

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
		this.network.makeAuthorization(user).subscribe(
			() => {
			this.storageService.setValue<User>(this.userName, user);
			this.userEmailTracker.next(user.email);
			this.router.navigateByUrl('courses');
			},
			(err) => {
				this.toggleValidationError(err);
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
		if (!this.network.getToken) {
			const user = this.storageService.getValue<User | undefined>(this.userName);
			this.userEmailTracker.next(user.email);
			return this.network.makeAuthorization(user);
		} else {
			return true;
		}
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
		this.userEmailTracker.next('');
	}

}
