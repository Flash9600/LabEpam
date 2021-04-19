// tslint:disable:no-any
import { Mock } from 'protractor/built/driverProviders';
import { Course } from '../../interfaces/course.interface';
import { OrderByPipe } from '../../pipes/orderBy-pipe/order-by.pipe';
import { CourseService } from './course.service';


describe('CourseService', () => {

	let service: CourseService;
	const OrderByFake: any = {
		transform: (array: [], way: string) => array
	};
	let coursesLength: number;
	const id = 1;
	let findCourse: (idCourse: number) => Course | undefined;
	beforeEach(() => {
		service = new CourseService(OrderByFake as OrderByPipe);
		coursesLength = (service as any).courses.length;
		findCourse = (idCourse: number) => {
			return (service as any).courses.find((course: Course) => {
				return course.id === idCourse;
			});
		};
	});

	it('getCourseList should return new sort array', () => {
		expect(service.getCourseList()).toEqual((service as any).courses);
	});

	it('createCourse should push new course to courses array', () => {
		service.createCourse();
		expect((service as any).courses.length).toBeGreaterThan(coursesLength);
	});

	it('deleteCourse should delete course by id from courses array', () => {
		const nearbyId = id + 1;
		service.deleteCourse(nearbyId);
		const deletedCourse = findCourse(nearbyId);
		expect(deletedCourse).toBeFalsy;
	});

	it('getItemById should find course by id from courses array and return it', () => {
		const courseById: Course = service.getItemById(id);
		expect(courseById.id).toEqual(id);
	});

	it('updateCourse should change course by id of courses array', () => {
		const newCourse: Course = {
			id,
			title: 'any',
			duration: 1,
			date: new Date(),
			description: 'about course',
			isTopRated: true
		};
		service.updateCourse(newCourse);
		const [newCourseFromArr] = (service as any).courses.filter((item: Course) => item.id === id);
		expect(newCourseFromArr === newCourse).toBeTrue;
	});
});
