import { ISearchState } from './../../../interfaces/search.interface';
import { setSearchAction } from './../actions/search.actions';
import { Action, createReducer, on } from '@ngrx/store';

import { initialSearchState } from 'src/app/interfaces/search.interface';

export const searchReducersCreator = createReducer(
	initialSearchState,
	on(setSearchAction, (state, {value}): ISearchState => {
		return {
			...state,
			value
		};
	}),
);

export function searchReducers(state: ISearchState, actions: Action): ISearchState  {
	return searchReducersCreator(state, actions);
}
