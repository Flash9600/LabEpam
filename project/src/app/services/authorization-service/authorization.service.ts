import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';

import { HttpService } from './../http-service/http.service';
import { StorageService } from 'src/app/services/local-storage-service/storage.service';
import { User } from 'src/app/interfaces/userEntity.interface';

@Injectable()
export class AuthorizationService {

	public loginTracker: BehaviorSubject<User | undefined>;
	public saveLoginInStoreTracker: Subject<User>;
	public userName: string;
	public validationErrorTextTracker: Subject<string>;
	protected user: User;

	constructor(
		protected storageService: StorageService,
		protected router: Router,
		protected network: HttpService
	) {
		this.userName = 'user';
		this.validationErrorTextTracker = new Subject<string>();
		this.login();
	}

	protected get userFromStorage(): User | undefined {
		return this.storageService.getValue<User | undefined>(this.userName);
	}

	protected login(): void {
		this.loginTracker = new BehaviorSubject<User | undefined>(this.userFromStorage);
		this.loginTracker.pipe(
			debounceTime(500),
			filter(userData => {
				if (userData) {
					return true;
				}
				this.storageService.deleteValue(this.userName);
				return false;
			}),
			tap(userData => this.user = userData),
			mergeMap(userData => this.network.makeAuthorization(userData)),
			filter(() => !this.userFromStorage)
		).subscribe(() => {
			this.router.navigateByUrl('courses');
			this.storageService.setValue<User>(this.userName, this.user);
		},
			(err) => {
				this.login();
				this.validationErrorTextTracker.next(`Incorrect username or password.`);
			});
	}
}
