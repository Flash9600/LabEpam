import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StaticModule } from './static-module/static.module';
import { OrderByPipe } from './pipes/orderBy-pipe/order-by.pipe';
import { AppComponent } from './app.component';
import {CoreModule} from './core-module/core.module';
import { CourseService } from './services/course-service/course.service';
import { StorageService } from './services/local-storage-service/storage.service';
import { CoursesGuard } from './router-module/courses.guard';
import { AuthorizationService } from './services/authorization/authorization.service';
import { AppRoutingModule } from './router-module/app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		RouterModule,
		CoreModule,
		StaticModule,
	],
	providers: [
		OrderByPipe,
		CourseService,
		StorageService,
		AuthorizationService,
		CoursesGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
