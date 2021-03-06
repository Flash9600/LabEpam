import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from './services/authorization-service/authorization.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	public userName: string;

	constructor( private authorizationService: AuthorizationService ) { }

	ngOnInit(): void{
		this.authorizationService.loginTracker
		.subscribe((user) => this.userName = user ? user.email : '');
	}

	logOut(): void {
		this.authorizationService.logOut();
	}
}
