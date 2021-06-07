import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		MainPageComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		MainPageComponent
	]
})
export class StaticModule { }
