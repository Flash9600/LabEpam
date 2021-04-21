import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

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
