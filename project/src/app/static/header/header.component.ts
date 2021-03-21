import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	toggle: boolean;
	componentRef: ComponentRef<UserLoginComponent>;
	@ViewChild('userLogin', { read: ViewContainerRef }) userLogin;

	constructor(private resolver: ComponentFactoryResolver) { }

	ngOnInit(): void {
		this.toggle = false;
	}

	@HostListener('click', ['$event.target.id'])
	removeLogin(eventId: string): void {
		if (eventId === 'submit') {
			this.createComponent();
		}
	}

	createComponent(): void {

		if (this.toggle) {
			this.userLogin.clear();
		} else {
			const factory: ComponentFactory<UserLoginComponent> = this.resolver.resolveComponentFactory(UserLoginComponent);
			this.componentRef = this.userLogin.createComponent(factory);
			// this.componentRef.type.switchLogin = this.removeLogin();
		}
		this.toggle = !this.toggle;
	}

}
