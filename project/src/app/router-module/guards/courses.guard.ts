import { map } from 'rxjs/operators';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpService } from './../../services/http-service/http.service';
import { User } from 'src/app/interfaces/userEntity.interface';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';


@Injectable()
export class CoursesGuard implements CanLoad {

	constructor(
		protected authorizationService: AuthorizationService,
		protected router: Router,
		protected network: HttpService) { }

	canLoad(rout: Route, segments: UrlSegment[]): Observable<boolean> {
		console.log('start guard');

		return this.authorizationService.loginTracker.pipe(
			map((user: User) => {
				if (!user) {
					this.router.navigate(['/login']);
					return false;
				}
				return true;
			})
		);
	}
}
