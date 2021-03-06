import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	public btnAuthorizationText: string;
	public userLogin: string;

	@Output() showUserLogin = new EventEmitter<void>();

	@Input() set userName(name: string) {
		this.userLogin = name;
		this.btnAuthorizationText = !!name ? 'Sign out' : 'Sign in';
	}

	onShowUserLogin(): void{
		this.showUserLogin.emit();
	}
}
