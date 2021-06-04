import { doToggleSearchCoursesAction } from './../actions/courses.actions';
import { Action, createReducer, on } from '@ngrx/store';

import {
	getCoursesSuccessAction,
	increaseCoursesPageAction,
	doToggleLoadMoreBtnAction,
} from '../actions/courses.actions';
import { ICoursesState, initialCoursesState } from '../state/coursesList.state';

export const coursesReducersCreator = createReducer(
	initialCoursesState,
	on(getCoursesSuccessAction, (state: ICoursesState, { courses }): ICoursesState => {
		return {
			...state,
			courses
		};
	}),
	on(increaseCoursesPageAction, (state: ICoursesState) => {
		return {
			...state,
			pageNumber: state.pageNumber + 1
		};
	}),
	on(doToggleLoadMoreBtnAction, (state: ICoursesState, { isShowLoadMoreBtn }) => {
		return {
			...state,
			isShowLoadMoreBtn
		};
	}),
	on(doToggleSearchCoursesAction, (state: ICoursesState, { isSearchCourses }) => {
		return {
			...state,
			isSearchCourses
		};
	}),
);

export function coursesReducers(state: ICoursesState, actions: Action): ICoursesState {
	return coursesReducersCreator(state, actions);
}
