import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
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
	public componentRef: ComponentRef<UserLoginComponent>;

	@ViewChild('userLogin', { read: ViewContainerRef }) userLoginContainer: ViewContainerRef;

	constructor(
		protected resolver: ComponentFactoryResolver,
		public authorizationService: AuthorizationService,
		public stateService: StateService
	) { }

	showUserLogin(): void {
		this.authorizationService.logOut();
		if (!this.componentRef) {
			this.createUserLoginComponent();
		} else {
			this.componentRef.instance.isShowUserLogin = true;
		}
	}

	createUserLoginComponent(): void {
		const factory: ComponentFactory<UserLoginComponent> = this.resolver.resolveComponentFactory(UserLoginComponent);
		this.componentRef = this.userLoginContainer.createComponent(factory);
	}

	get isShowAddCoursePage(): boolean {
		return this.stateService.isShowAddCoursePage;
	}

	get sortWay(): string {
		return this.stateService.sortWay;
	}
}
