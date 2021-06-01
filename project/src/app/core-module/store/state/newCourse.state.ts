import { Course } from 'src/app/interfaces/course.interface';
import { INewCourseState } from 'src/app/interfaces/newCourseState.interface';

export const initialNewCourseState: INewCourseState = {
	course: new Course({
		title: '',
		date: new Date(),
		duration: 0,
		description: '',
		isTopRated: false,
		authors: ['']
	}),
	isNewCourse: true
};
