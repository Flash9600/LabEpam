import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
	let pipe: DurationPipe;
	beforeEach (() => {
		pipe = new DurationPipe();
	});
	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});
	it('should return duration', () => {

		expect(pipe.transform(60)).toBe('1h');
	});
	it('should return duration', () => {

		expect(pipe.transform(59)).toBe('59m');
	});
	it('should return duration', () => {

		expect(pipe.transform(61)).toBe('1h 1m');
	});
});
