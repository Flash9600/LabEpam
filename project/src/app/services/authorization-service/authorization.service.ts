import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

import { HttpService } from './../http-service/http.service';
import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { User } from 'src/app/interfaces/userEntity.interface';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationService {

	public loginTracker: BehaviorSubject<User | undefined>;
	public userName: string;
	public validationErrorTextTracker: Subject<string>;
	protected user: User;

	constructor(
		protected storageService: StorageService,
		protected router: Router,
		protected network: HttpService) {
			this.userName = 'user';
			this.validationErrorTextTracker = new Subject<string>();
			this.login();
		}

		protected login(): void{
			const user = this.storageService.getValue<User | undefined>(this.userName);
			this.loginTracker = new BehaviorSubject<User | undefined>(user);
			this.loginTracker.pipe(
				filter(userData => !!userData),
				tap(userData => this.user = userData),
				switchMap(userData => this.network.makeAuthorization(userData))
			).subscribe(() => {
					this.storageService.setValue<User>(this.userName, this.user);
					this.router.navigateByUrl('courses');
				},
				(err) => {
					this.login();
					this.validationErrorTextTracker.next(`Incorrect username or password.`);
			});
	}

	public logOut(): void {
		this.storageService.deleteValue(this.userName);
		this.loginTracker.next(null);
	}

}
