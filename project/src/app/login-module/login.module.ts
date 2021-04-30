import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './user-login/error-message/error-message.component';
import { UserLoginComponent } from './user-login/user-login.component';



@NgModule({
	declarations: [
		UserLoginComponent,
		ErrorMessageComponent,
	],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		UserLoginComponent,
		ErrorMessageComponent
	]
})
export class LoginModule { }
