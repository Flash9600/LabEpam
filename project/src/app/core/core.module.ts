import { NgModule} from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe} from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { AddCourseComponent } from './search/add-course/add-course.component';
import { FormsModule } from '@angular/forms';
import { DateColorDirective } from './date-color-directive/date-color.directive';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { OrderByPipe } from './orderBy-pipe/order-by.pipe';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		OrderByPipe
		],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		CourseListComponent,
		SearchComponent,
		CourseItemComponent,
		DateColorDirective,
		DurationPipe,
		OrderByPipe]
})
export class CoreModule {

}
