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

	public logIn(email: string, password: string): boolean {
		if (this.isValidData(email, password)) {
			const userData: UserLogInterface = {
				email,
				password
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

	protected isValidData(email: string, password: string): boolean {
		return !!(email && email.match(/.+@.+\..+/i) && password);
	}
}
