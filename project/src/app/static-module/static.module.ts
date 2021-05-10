import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		LoaderComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		LoaderComponent]
})
export class StaticModule { }
