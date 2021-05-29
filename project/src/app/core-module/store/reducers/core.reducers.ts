import { ActionReducerMap } from '@ngrx/store';

import { IState } from 'src/app/interfaces/state.interface';
import { coursesReducers } from './courses.reducers';

export const coreReducers: ActionReducerMap<IState> = {
	coursesList: coursesReducers,
	search: null
};
