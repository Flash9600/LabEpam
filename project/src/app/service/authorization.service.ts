import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { User } from './../interfaces/userLog.interface';

@Injectable()
export class AuthorizationService {

	constructor(protected storageService: StorageService) { }

	protected userName = 'user';

	public get IsAuthenticated(): boolean {
		return !!this.storageService.getValue<User | undefined>(this.userName);
	}

	public logIn(email: string, password: string): boolean {
		if (this.isValidData(email, password)) {
			const userData: User = {
				email,
				password
			};
			this.storageService.setValue<User>(this.userName, userData);
			return false;
		}
		return true;
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
	}

	public getUserInfo(): string {
		if (this.IsAuthenticated) {
			return this.storageService.getValue<User>(this.userName).email;
		}
		return '';
	}

	protected isValidData(email: string, password: string): boolean {
		return !!(email && email.match(/.+@.+\..+/i) && password);
	}
}
