import { Action, createReducer, on } from '@ngrx/store';

import { ISearchState } from '../state/search.state';
import { setSearchAction } from './../actions/search.actions';
import { initialSearchState } from 'src/app/core-module/store/state/search.state';

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
