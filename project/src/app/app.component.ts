import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthorizationService } from './services/authorization/authorization.service';
import { StateService } from './services/state/state.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor( public authorizationService: AuthorizationService ) { }

	logOut(): void {
		this.authorizationService.logOut();
	}
}
