import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StaticModule } from './static-module/static.module';
import { OrderByPipe } from './pipes/orderBy-pipe/order-by.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core-module/core.module';
import { CourseService } from './services/course-service/course.service';
import { StorageService } from './services/local-storage-service/storage.service';

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
	providers: [OrderByPipe, CourseService, StorageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
