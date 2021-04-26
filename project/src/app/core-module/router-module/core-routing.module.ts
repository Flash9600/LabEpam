import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCoursePageComponent } from '../components/add-course-page/add-course-page.component';
import { CustomCourseListComponent } from '../components/custom-course-list/custom-course-list.component';


const routes: Routes = [
	{ path: '', component: CustomCourseListComponent},

	{ path: 'new', component: AddCoursePageComponent},

	{ path: ':id', component: AddCoursePageComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule { }
