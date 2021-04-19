import { DateColorDirective } from './date-color.directive';

describe('DateColorDirective', () => {
	let directive: DateColorDirective;

	beforeEach(() => {
		directive = new DateColorDirective();
	});

	describe('isUpcomingCourse', () => {
		it('should return true, if incoming date of milliseconds >= currentDate', () => {
			const result = directive.isUpcomingCourse(new Date(9999, 0, 0).getTime());
			expect(result).toBeTrue();
		});

		it('should return false, if incoming date of milliseconds < currentDate', () => {
			const result = directive.isUpcomingCourse(new Date().getTime() - 1000);
			expect(result).toBeFalse();
		});
	});

	describe('isFreshCourse', () => {
		let result: boolean;

		it('should return true, if incoming date of milliseconds not less than or equal 14 days then currentDate', () => {
			result = directive.isFreshCourse(new Date().getTime() - 10 ** 3);
			expect(result).toBeTrue();
		});
		it('should return false, if incoming date of milliseconds less than 14 days then currentDate', () => {
			result = directive.isFreshCourse(new Date(2020, 0, 1).getTime());
			expect(result).toBeFalse();
		});
	});

	describe('ngOnChanges', () => {
		beforeEach(() => {
			directive.course = {
				id: 1,
				title: 'any',
				duration: 1,
				date: new Date(),
				description: 'about course',
				isTopRated: true
			};
		});
		it('should change elementClass to "course-item_upcoming", if course date of milliseconds >= currentDate', () => {
			directive.isUpcomingCourse = () => true;
			directive.ngOnChanges();
			expect(directive.elementClass).toEqual('course-item_upcoming');
		});
	 it('should change elementClass to "course-item_fresh", if date of milliseconds not less than or equal 14 days then currentDate', () => {
			directive.isUpcomingCourse = () => false;
			directive.isFreshCourse = () => true;
			directive.ngOnChanges();
			expect(directive.elementClass).toEqual('course-item_fresh');
		});
	});
});
