import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable()
export class CoursesGuard implements CanActivate {

	constructor(protected authorizationService: AuthorizationService, protected router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authorizationService.IsAuthenticated) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}

}
