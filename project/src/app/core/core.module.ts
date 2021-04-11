import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { AddCourseComponent } from './search/add-course/add-course.component';
import { DateColorDirective } from './date-color-directive/date-color.directive';
import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { ConfirmationComponent } from './course-list/course-item/confirmation/confirmation.component';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent
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
		ConfirmationComponent
		]
})
export class CoreModule {

}
