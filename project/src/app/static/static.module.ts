import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationService } from './../service/authorization.service';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ErrorMessageComponent } from './user-login/error-message/error-message.component';



@NgModule({
	entryComponents: [UserLoginComponent],
	declarations: [HeaderComponent,
		FooterComponent,
		BreadcrumbsComponent,
		UserLoginComponent,
		ErrorMessageComponent
	],
	imports: [
		CommonModule
	],
	providers: [AuthorizationService],
	exports: [HeaderComponent, BreadcrumbsComponent, FooterComponent]
})
export class StaticModule { }
