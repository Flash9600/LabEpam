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
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { DateInputComponent } from './add-course-page/date-input/date-input.component';
import { DurationInputComponent } from './add-course-page/duration-input/duration-input.component';
import { AuthorsInputComponent } from './add-course-page/authors-input/authors-input.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ErrorMessageComponent } from './user-login/error-message/error-message.component';
import { AuthorizationService } from '../static/services/authorization/authorization.service';



@NgModule({
	entryComponents: [UserLoginComponent],
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent,
		UserLoginComponent,
		ErrorMessageComponent,
		DateInputComponent,
		DurationInputComponent,
		AuthorsInputComponent
		],
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [AuthorizationService],
	exports: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		AddCourseComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent
		]
})
export class CoreModule {

}
