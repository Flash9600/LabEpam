import { RouterReducerState } from '@ngrx/router-store';

import { ICoursesState } from '../core-module/store/state/coursesList.state';
import { ISearchState } from '../core-module/store/state/search.state';
import { INewCourseState } from './newCourseState.interface';

export interface IState {
	coursesList: ICoursesState;
	search: ISearchState;
	newCourse: INewCourseState;
	router?: RouterReducerState;
}
