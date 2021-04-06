import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	ViewChild,
	ViewContainerRef
} from '@angular/core';

import { AuthorizationService } from './service/authorization.service';
import { UserLoginComponent } from './static/user-login/user-login.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public sortWay: string;

	public componentRef: ComponentRef<UserLoginComponent>;

	@ViewChild('userLogin', { read: ViewContainerRef }) userLoginContainer: ViewContainerRef;

	constructor(protected resolver: ComponentFactoryResolver, public authorizationService: AuthorizationService) { }

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

}
