import { Action, createReducer, on } from '@ngrx/store';

import { ICoursesState } from './../../../interfaces/course.interface';
import { getMoreCoursesAction, getCoursesSuccessAction } from '../actions/courses.actions';
import { initialCoursesState } from 'src/app/interfaces/course.interface';

export const coursesReducersCreator = createReducer(
	initialCoursesState,
	on(getCoursesSuccessAction, (state: ICoursesState, {courses}): ICoursesState => {
			return {
				...state,
				courses
			};
	}),
	on(getMoreCoursesAction, (state: ICoursesState, {courses}) => {
			return {
				...state,
				courses
			};
	}),
);

export function coursesReducers(state: ICoursesState, actions: Action): ICoursesState  {
	return coursesReducersCreator(state, actions);
}
