import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable()
export class CoursesGuard implements CanActivate {

	constructor(protected authorizationService: AuthorizationService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authorizationService.IsAuthenticated;
	}

}
