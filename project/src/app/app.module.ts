import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StaticModule } from './static-module/static.module';
import { StorageService } from './services/local-storage-service/storage.service';
import { AuthorizationService } from './services/authorization-service/authorization.service';
import { AppRoutingModule } from './router-module/app-routing.module';
import { LoginModule } from './login-module/login.module';
import { LoaderService } from './services/loader-service/loader.service';
import { HttpService } from './services/http-service/http.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SharedModule } from './shared-module/shared.module';
import { CoursesGuard } from './router-module/guards/courses.guard';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		HttpClientModule,
		RouterModule,
		StaticModule,
		LoginModule,
		SharedModule
	],
	providers: [
		StorageService,
		AuthorizationService,
		CoursesGuard,
		HttpService,
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
