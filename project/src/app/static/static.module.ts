import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ErrorMessageComponent } from './user-login/error-message/error-message.component';
import { ValidationDirective } from './user-login/validation-directive/validation.directive';



@NgModule({
	entryComponents: [UserLoginComponent],
	declarations: [HeaderComponent,
		FooterComponent,
		BreadcrumbsComponent,
		UserLoginComponent,
		ErrorMessageComponent,
		ValidationDirective
	],
	imports: [
		CommonModule
	],
	exports: [HeaderComponent, BreadcrumbsComponent, FooterComponent]
})
export class StaticModule { }
