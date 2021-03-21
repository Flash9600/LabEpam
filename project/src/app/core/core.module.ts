import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { AddCourseComponent } from './search/add-course/add-course.component';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent
		],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [CourseListComponent, SearchComponent, CourseItemComponent]
})
export class CoreModule { }
