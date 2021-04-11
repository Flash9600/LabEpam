import { DateColorDirective } from './date-color.directive';

describe('DateColorDirective', () => {
	let directive: DateColorDirective;

	beforeEach(() => {
		directive = new DateColorDirective();
	});

	describe('isUpcomingCourse', () => {
		it('isUpcomingCourse should return true, when incoming date of milliseconds >= currentDate', () => {
			const result = directive.isUpcomingCourse(new Date(9999, 0, 0).getTime());
			expect(result).toBeTrue();
		});

		it('isUpcomingCourse should return false, when incoming date of milliseconds < currentDate', () => {
			const result = directive.isUpcomingCourse(new Date().getTime() - 1000);
			expect(result).toBeFalse();
		});
	});

	describe('isFreshCourse', () => {
		it('isFreshCourse should return true, when incoming date of milliseconds not less than or equal 14 days then currentDate', () => {
			const result = directive.isFreshCourse(new Date().getTime() - 10 ** 3);
			expect(result).toBeTrue();
		});
		it('isFreshCourse should return false, when incoming date of milliseconds less than 14 days then currentDate', () => {
			const result = directive.isFreshCourse(new Date(2020, 0, 1).getTime());
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
				topRated: true
			};
		})
		it('ngOnChanges should return true, when incoming date of milliseconds not less than or equal 14 days then currentDate', () => {
			directive.isUpcomingCourse = () => true;
			directive.ngOnChanges();
			expect(directive.elementClass).toEqual('course-item_upcoming');
		});
		it('ngOnChanges should return false, when incoming date of milliseconds less than 14 days then currentDate', () => {
			directive.isUpcomingCourse = () => false;
			directive.isFreshCourse = () => true;
			directive.ngOnChanges();
			expect(directive.elementClass).toEqual('course-item_fresh');
		});
	});
});
