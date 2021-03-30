import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

	public toggle: boolean;
	public inputValue: string;

	@ViewChild('emailInput') email: ElementRef;

	checkInput(): void {
		this.inputValue = this.email.nativeElement.value;
	}


}

