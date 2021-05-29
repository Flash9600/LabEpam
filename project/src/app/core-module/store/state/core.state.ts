import { initialSearchState } from './../../../interfaces/search.interface';
import { IState } from 'src/app/interfaces/state.interface';
import { initialCoursesState } from 'src/app/interfaces/course.interface';

export const initialState: IState = {
	coursesList: initialCoursesState,
	search: initialSearchState
};

export function getInitialState(): IState {
	return initialState;
}
