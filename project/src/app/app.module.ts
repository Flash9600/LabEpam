import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StaticModule } from './static/static.module';
import { OrderByPipe } from './pipes/orderBy-pipe/order-by.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import { CourseService } from './service/course-service/course.service';

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
	providers: [OrderByPipe, CourseService],
	bootstrap: [AppComponent]
})
export class AppModule { }
