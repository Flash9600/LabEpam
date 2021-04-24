import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { DateInputComponent } from './components/add-course-page/date-input/date-input.component';
import { DurationInputComponent } from './components/add-course-page/duration-input/duration-input.component';
import { AuthorsInputComponent } from './components/add-course-page/authors-input/authors-input.component';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ConfirmationComponent } from './components/custom-course-list/course-list/course-item/confirmation/confirmation.component';
import { CourseItemComponent } from './components/custom-course-list/course-list/course-item/course-item.component';
import { CourseListComponent } from './components/custom-course-list/course-list/course-list.component';
import { CustomCourseListComponent } from './components/custom-course-list/custom-course-list.component';
import { SearchComponent } from './components/search/search.component';
import { ErrorMessageComponent } from './components/user-login/error-message/error-message.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { DateColorDirective } from './directives/date-color-directive/date-color.directive';
import { NoContentComponent } from './components/no-content/no-content.component';



@NgModule({
	declarations: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		DateColorDirective,
		DurationPipe,
		UserLoginComponent,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent,
		ErrorMessageComponent,
		DateInputComponent,
		DurationInputComponent,
		AuthorsInputComponent,
		NoContentComponent
		],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule
	],
	providers: [AuthorizationService],
	exports: [
		SearchComponent,
		CourseListComponent,
		CourseItemComponent,
		DateColorDirective,
		DurationPipe,
		ConfirmationComponent,
		CustomCourseListComponent,
		AddCoursePageComponent,
		NoContentComponent,
		UserLoginComponent
		]
})
export class CoreModule {

}
