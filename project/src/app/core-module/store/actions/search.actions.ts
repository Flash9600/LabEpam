import { createAction, props } from '@ngrx/store';

import { ISearchState } from '../state/search.state';


export enum ESearchActions {
	setSearch = '[Search] SetSearch',
}

export const setSearchAction = createAction(
	ESearchActions.setSearch,
	props<ISearchState>()
);

