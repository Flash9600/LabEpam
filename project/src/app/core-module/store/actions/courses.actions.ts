import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course.interface';

export enum ECoursesActions {
	getCourses = '[CoursesList] GetCourses',
	getMoreCourses = '[CoursesList] GetMoreCourses',
	getCoursesBySearch = '[CoursesList] GetPartOfCoursesBySearch',
	getCoursesSuccess = '[CoursesList] GetCoursesSuccess'
}

export const getCoursesAction = createAction(
	ECoursesActions.getCourses
);

export const getMoreCoursesAction = createAction(
	ECoursesActions.getMoreCourses,
	props<{courses: Course[]}>()
);

export const getCoursesBySearchAction = createAction(
	ECoursesActions.getCoursesBySearch,
	 props<{search?: string }>()
);

export const getCoursesSuccessAction = createAction(
	ECoursesActions.getCoursesSuccess,
	props<{courses: Course[]}>()
);
