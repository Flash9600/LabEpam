import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCoursePageComponent } from './core-module/components/add-course-page/add-course-page.component';
import { CustomCourseListComponent } from './core-module/components/custom-course-list/custom-course-list.component';
import { NoContentComponent } from './core-module/components/no-content/no-content.component';

const routes: Routes = [
	{ path: '', redirectTo: 'courses', pathMatch: 'full'},

	{ path: 'courses', component: CustomCourseListComponent},

	{ path: 'courses/new', component: AddCoursePageComponent},

	{ path: 'courses/:id', component: AddCoursePageComponent},

	{ path: '**', component: NoContentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
