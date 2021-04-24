import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { UserLoginComponent } from './core-module/components/user-login/user-login.component';

import { AuthorizationService } from './core-module/services/authorization/authorization.service';
import { StateService } from './services/state/state.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isShowUserLogin: boolean;

	constructor(
		public authorizationService: AuthorizationService,
		public stateService: StateService
	) { }

	logOut(): void {
		this.authorizationService.logOut();
	}

	get isShowAddCoursePage(): boolean {
		return this.stateService.isShowAddCoursePage;
	}

	get sortWay(): string {
		return this.stateService.sortWay;
	}
}
