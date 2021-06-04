import { Action, createReducer, on } from '@ngrx/store';

import { doAddNewCourseAction, doAuthorsListSuccessAction, doToggleNewCourseAction } from '../actions/newCourse.actions';
import { initialNewCourseState } from '../state/newCourse.state';
import { INewCourseState } from 'src/app/interfaces/newCourseState.interface';

export const newCourseReducersCreator = createReducer(
	initialNewCourseState,
	on(doAddNewCourseAction, (state, { newCourse }): INewCourseState => {
		return {
			...state,
			course: newCourse
		};
	}),
	on(doToggleNewCourseAction, (state, { isNewCourse }): INewCourseState => {
		return {
			...state,
			isNewCourse
		};
	}),
	on(doAuthorsListSuccessAction, (state, { authorsList }): INewCourseState => {
		return {
			...state,
			authorsList
		};
	})
);

export function newCourseReducers(state: INewCourseState, actions: Action): INewCourseState {
	return newCourseReducersCreator(state, actions);
}
