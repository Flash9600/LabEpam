import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NoContentComponent } from './components/no-content/no-content.component';



@NgModule({
	declarations: [
		LoaderComponent,
		BreadcrumbsComponent,
		NoContentComponent,
	],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		LoaderComponent,
		BreadcrumbsComponent,
		NoContentComponent,
	]
})
export class SharedModule { }
