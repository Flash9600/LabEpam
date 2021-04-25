import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCoursePageComponent } from '../core-module/components/add-course-page/add-course-page.component';
import { CustomCourseListComponent } from '../core-module/components/custom-course-list/custom-course-list.component';
import { NoContentComponent } from '../core-module/components/no-content/no-content.component';
import { UserLoginComponent } from '../core-module/components/user-login/user-login.component';
import { CoursesGuard } from './courses.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'courses', pathMatch: 'full'},

	{ path: 'login', component: UserLoginComponent},

	{ path: 'courses', canActivate: [CoursesGuard], children: [

		{ path: '', component: CustomCourseListComponent},

		{ path: 'new', component: AddCoursePageComponent},

		{ path: ':id', component: AddCoursePageComponent},

	]},

	{ path: '**', component: NoContentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
