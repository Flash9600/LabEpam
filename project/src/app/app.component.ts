import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef, HostListener,
	OnInit, Output, ViewChild,
	ViewContainerRef,
	EventEmitter,
	OnChanges
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
	public shouldShowContent = true;

	public componentRef: ComponentRef<UserLoginComponent>;

	@ViewChild('userLogin', { read: ViewContainerRef }) userLoginContainer: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver, public authorizationService: AuthorizationService) { }

	showUserLoginComponent(): void {
			this.authorizationService.logOut();
			if (!this.componentRef) {
				this.createUserLoginComponent();
			} else {
				this.componentRef.instance.isShowUserLogin = true;
			}
			this.shouldShowContent = false;
	}

	createUserLoginComponent(): void {
		const factory: ComponentFactory<UserLoginComponent> = this.resolver.resolveComponentFactory(UserLoginComponent);
		this.componentRef = this.userLoginContainer.createComponent(factory);
	}

}
