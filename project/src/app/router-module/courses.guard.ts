import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthorizationService } from '../services/authorization-service/authorization.service';

@Injectable()
export class CoursesGuard implements CanLoad {

	constructor(
		protected authorizationService: AuthorizationService,
		protected router: Router) {}

	canLoad(rout: Route, segments: UrlSegment[]): boolean | Subject<boolean> {
		if (this.authorizationService.isLogin) {
			return this.authorizationService.createToken();
		}
		this.router.navigate(['/login']);
		return false;
	}
}
