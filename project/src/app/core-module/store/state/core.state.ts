import { IState } from 'src/app/interfaces/state.interface';
import { initialCoursesState } from './coursesList.state';
import { initialSearchState } from './search.state';

export const initialState: IState = {
	coursesList: initialCoursesState,
	search: initialSearchState
};

export function getInitialState(): IState {
	return initialState;
}
