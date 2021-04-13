import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './custom-course-list/course-list/course-list.component';
import { CourseItemComponent } from './custom-course-list/course-list/course-item/course-item.component';
import { AddCourseComponent } from './search/add-course/add-course.component';
import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { ConfirmationComponent } from './custom-course-list/course-list/course-item/confirmation/confirmation.component';
import { DateColorDirective } from './date-color-directive/date-color.directive';
import { CustomCourseListComponent } from './custom-course-list/custom-course-list.component';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent
		],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent
		]
})
export class CoreModule {

}
