import { IState } from 'src/app/interfaces/state.interface';
import { initialCoursesState } from './coursesList.state';
import { initialNewCourseState } from './newCourse.state';
import { initialSearchState } from './search.state';

export const initialState: IState = {
	coursesList: initialCoursesState,
	search: initialSearchState,
	newCourse: initialNewCourseState
};

export function getInitialState(): IState {
	return initialState;
}
