import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { UserLogInterface } from './../interfaces/userLog.interface';

@Injectable()
export class AuthorizationService {

	constructor(protected storageService: StorageService) { }

	protected userName = 'user';

	public get IsAuthenticated(): boolean {
		return !!this.storageService.getValue<UserLogInterface | undefined>(this.userName);
	}

	public logIn(emailValue: string, passwordValue: string): boolean {
		if (emailValue && emailValue.match(/.+@.+\..+/i) && passwordValue) {
			const userData: UserLogInterface = {
				email: emailValue,
				password: passwordValue
			};
			this.storageService.setValue<UserLogInterface>(this.userName, userData);
			return false;
		}
		return true;
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
	}

	public getUserInfo(): string {
		if (this.IsAuthenticated) {
			return this.storageService.getValue<UserLogInterface>(this.userName).email;
		}
		return '';
	}
}
