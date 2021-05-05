import { Component, OnChanges } from '@angular/core';

import { AuthorizationService } from './services/authorization-service/authorization.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{

	userName: string;

	constructor( private authorizationService: AuthorizationService ) { }

	ngOnChanges(): void{
		this.userName = this.authorizationService.getUserInfo();
	}

	logOut(): void {
		this.authorizationService.logOut();
	}
}
