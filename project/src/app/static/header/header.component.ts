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

	@HostListener('mousedown', ['$event.target.id'])
	removeLogin(eventId: string): void {
		if (eventId === 'close') {
			this.showComponent();
			this.componentRef.instance.inputValue = '';
		} else if (eventId === 'error-ok') {
			this.componentRef.instance.inputValue = '';
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
	}
}
