import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
	let pipe: DurationPipe;
	beforeEach (() => {
		pipe = new DurationPipe();
	});

	it('transform should return duration in format "1h"', () => {

		expect(pipe.transform(60)).toBe('1h');
	});
	it('transform should return duration in format "1m"', () => {

		expect(pipe.transform(59)).toBe('59m');
	});
	it('transform should return duration in format "1h: 1m"', () => {

		expect(pipe.transform(61)).toBe('1h 1m');
	});
});
