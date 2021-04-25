import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { IUser } from '../../interfaces/userLog.interface';

@Injectable()
export class AuthorizationService {

	constructor(protected storageService: StorageService, protected router: Router) { }

	protected userName = 'user';

	public get IsAuthenticated(): boolean {
		return !!this.storageService.getValue<IUser | undefined>(this.userName);
	}

	public logIn(email: string, password: string): boolean {
		if (this.isValidData(email, password)) {
			const userData: IUser = {
				email,
				password
			};
			this.storageService.setValue<IUser>(this.userName, userData);
			this.router.navigateByUrl('courses');
			return false;
		}
		return true;
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
	}

	public getUserInfo(): string {
		if (this.IsAuthenticated) {
			return this.storageService.getValue<IUser>(this.userName).email;
		}
		return '';
	}

	protected isValidData(email: string, password: string): boolean {
		return !!(email && email.match(/.+@.+\..+/i) && password);
	}
}
