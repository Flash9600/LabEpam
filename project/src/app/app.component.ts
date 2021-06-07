import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

import { AuthorizationService } from './services/authorization-service/authorization.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	public userName: string;

	constructor(private authorizationService: AuthorizationService) { }

	ngOnInit(): void {
		this.authorizationService.loginTracker.pipe(delay(1000))
			.subscribe((user) => this.userName = user ? user.email : '');
	}

}
