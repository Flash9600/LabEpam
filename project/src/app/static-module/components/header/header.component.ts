import { Component, Input } from '@angular/core';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	public btnAuthorization: string;
	public userLogin: string;

	@Input() set userName(name: string) {
		this.userLogin = name;
		this.btnAuthorization = !!name ? 'Sign out' : '';
	}

}
