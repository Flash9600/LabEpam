import { OrderByPipe } from './core/orderBy-pipe/order-by.pipe';
import { StaticModule } from './static/static.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		StaticModule,
		FormsModule,

	],
	providers: [OrderByPipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
