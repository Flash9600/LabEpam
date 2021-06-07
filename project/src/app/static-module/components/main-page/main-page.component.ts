import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

	public btnAuthorizationText = 'Sign in';
	public isDisabled: boolean;
	protected subscription: Subscription;

	constructor(private authorizationService: AuthorizationService) { }

	ngOnInit(): void {
		this.subscription = this.authorizationService.loginTracker.pipe(delay(1000))
			.subscribe((user) => {
				if (user) {
					this.btnAuthorizationText = 'Sign out';
					this.isDisabled = false;
				} else {
					this.btnAuthorizationText = 'Sign in';
					this.isDisabled = true;
				}
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
