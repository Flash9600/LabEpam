import { HttpService } from './services/http-service/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StaticModule } from './static-module/static.module';
import { OrderByPipe } from './pipes/orderBy-pipe/order-by.pipe';
import { AppComponent } from './app.component';
import { CourseService } from './services/course-service/course.service';
import { StorageService } from './services/local-storage-service/storage.service';
import { CoursesGuard } from './router-module/courses.guard';
import { AuthorizationService } from './services/authorization-service/authorization.service';
import { AppRoutingModule } from './router-module/app-routing.module';
import { LoginModule } from './login-module/login.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		RouterModule,
		StaticModule,
		LoginModule,
		HttpClientModule,
	],
	providers: [
		OrderByPipe,
		CourseService,
		StorageService,
		AuthorizationService,
		CoursesGuard,
		HttpService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
