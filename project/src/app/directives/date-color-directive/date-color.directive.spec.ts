import { DateColorDirective } from './date-color.directive';

describe('DateColorDirective', () => {
	let directive: DateColorDirective;

	beforeEach(() => {
		directive = new DateColorDirective();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
	it('should return true', () => {
		const result = directive.isUpcomingCourse(new Date(9999, 0, 0).getTime());
		expect(result).toBeTrue();
	});
	it('should return true', () => {
		const result = directive.isUpcomingCourse(new Date().getTime() - 1000);
		expect(result).toBeFalse();
	});
	it('should return true', () => {
		const result = directive.isFreshCourse(new Date().getTime() - 10 ** 3);
		expect(result).toBeTrue();
	});
	it('should return false', () => {
		const result = directive.isFreshCourse(new Date(2020, 0, 1).getTime());
		expect(result).toBeFalse();
	});
});
