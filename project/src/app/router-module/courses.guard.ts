import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable()
export class CoursesGuard implements CanLoad {

	constructor(protected authorizationService: AuthorizationService, protected router: Router) {}

	canLoad(rout: Route, segments: UrlSegment[]): boolean  {
		if (this.authorizationService.IsAuthenticated) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}

}
