import { Course } from './../interfaces/course.interface';
// tslint:disable:no-any
import { OrderByPipe } from '../pipes/orderBy-pipe/order-by.pipe';

import { CourseService } from './course.service';

describe('CourseService', () => {

	let service: CourseService;
	const OrderByFake: any = {
		transform: (array: [], way: string) => array
	};
	let coursesLength: number;
	let id: number;
	let findCourse: (idCourse: number) => Course | undefined;
	beforeEach(() => {
		service = new CourseService(OrderByFake as OrderByPipe);
		coursesLength = (service as any).courses.length;
		id = Math.floor(Math.random() * coursesLength);
		findCourse = (idCourse: number) => {
			return (service as any).courses.find((course: Course) => {
				return course.id === idCourse;
			});
		}
	});

	describe('corseLength get', () => {

		it('corseLength should return length of course array', () => {
			expect(service.coursesLength).toBeGreaterThan(0);
		});
	});

	describe('getCourseList method', () => {

		it('getCourseList should return sort array', () => {
			expect(service.getCourseList()).toBe((service as any).courses);
		});
	});

	describe('createCourse method', () => {

		it('createCourse should push new course to courses array', () => {
			service.createCourse();
			expect((service as any).courses.length).toBeGreaterThan(coursesLength);
		});
	});

	describe('getItemById method', () => {

		it('getItemById should find course by id from courses array and return it', () => {
			const courseById: Course = service.getItemById(id);
			expect(courseById.id).toEqual(id);
		});
	});

	describe('getItemById method', () => {

		it('getItemById should find course by id from courses array and return it', () => {
			const courseById: Course = service.getItemById(id);
			expect(courseById.id).toEqual(id);
		});
	});

	describe('deleteCourse method', () => {

		it('deleteCourse should delete course by id from courses array', () => {
			service.deleteCourse(id);
			const deletedCourse = findCourse(id);
			expect(deletedCourse).toBeFalsy;
		});
	});

	describe('updateCourse method', () => {

		it('updateCourse should change course by id of courses array', () => {
			const newCourse: Course = {
				id,
				title: 'any',
				duration: 1,
				date: new Date(0, 0, 0),
				description: 'about course',
				topRated: true
			};
			service.updateCourse(newCourse);
			const [newCourseFromArr] = (service as any).courses.filter(item => item.id === id)
			expect(newCourseFromArr === newCourse).toBeTrue;
		});
	});
});
