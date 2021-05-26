import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { DateInputComponent } from './components/add-course-page/date-input/date-input.component';
import { DurationInputComponent } from './components/add-course-page/duration-input/duration-input.component';
import { AuthorsInputComponent } from './components/add-course-page/authors-input/authors-input.component';
import { ConfirmationComponent } from './components/custom-course-list/course-list/course-item/confirmation/confirmation.component';
import { CourseItemComponent } from './components/custom-course-list/course-list/course-item/course-item.component';
import { CourseListComponent } from './components/custom-course-list/course-list/course-list.component';
import { CustomCourseListComponent } from './components/custom-course-list/custom-course-list.component';
import { SearchComponent } from './components/search/search.component';
import { DateColorDirective } from './directives/date-color-directive/date-color.directive';
import { CoreRoutingModule } from './router-module/core-routing.module';
import { SharedModule } from './../shared-module/shared.module';
import { SearchValidatorDirective } from './directives/search-validator/search-validator.directive';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent,
		DateInputComponent,
		DurationInputComponent,
		AuthorsInputComponent,
		SearchValidatorDirective,
		],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		SharedModule,
		CoreRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent,
		]
})
export class CoreModule {

}
