import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './user-login/error-message/error-message.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { EmailValidationDirective } from './directives/email-validation.directive';
import { PasswordValidationDirective } from './directives/password-validation.directive';



@NgModule({
	declarations: [
		UserLoginComponent,
		ErrorMessageComponent,
		EmailValidationDirective,
		PasswordValidationDirective,
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
