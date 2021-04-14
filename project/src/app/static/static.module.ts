import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationService } from './services/authorization/authorization.service';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from '../core/user-login/user-login.component';
import { ErrorMessageComponent } from '../core/user-login/error-message/error-message.component';



@NgModule({
	declarations: [HeaderComponent,
		FooterComponent,
		BreadcrumbsComponent,
	],
	imports: [
		CommonModule
	],
	exports: [HeaderComponent, BreadcrumbsComponent, FooterComponent]
})
export class StaticModule { }
