import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public toggle: boolean;
	public componentRef: ComponentRef<UserLoginComponent>;
	@ViewChild('userLogin', { read: ViewContainerRef }) userLogin: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver) { }

	ngOnInit(): void {
		this.toggle = true;
	}

	@HostListener('click', ['$event.target.id'])
	removeLogin(eventId: string): void {
		if (eventId === 'submit') {
			this.showComponent();
		}
	}

	showComponent(): void {
		if (!this.componentRef) {
			this.createComponent();
		} else {
		this.toggle = !this.toggle;
		}
		this.componentRef.instance.toggle = this.toggle;
	}

	createComponent(): void {
		const factory: ComponentFactory<UserLoginComponent> = this.resolver.resolveComponentFactory(UserLoginComponent);
		this.componentRef = this.userLogin.createComponent(factory);
		console.log('factory:', factory);
		console.log('componentRef:', this.componentRef);
		console.log('userLogin:', this.userLogin);
	}
}
