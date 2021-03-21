import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit{

	@Output() switchLogin = new EventEmitter<boolean>();

	ngOnInit(): void {

	}

	removeMe(): void {
		this.switchLogin.emit(true);
	}
}

