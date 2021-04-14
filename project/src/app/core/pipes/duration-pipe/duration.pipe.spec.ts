import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
	let pipe: DurationPipe;
	let minutes: number;
	beforeEach (() => {
		pipe = new DurationPipe();
	});

	it('transform should return duration in format "1h", if incoming number % 60 = 0', () => {
		minutes = 60;
		expect(pipe.transform(minutes)).toBe('1h');
	});
	it('transform should return duration in format "1m", if incoming number < 60', () => {
		minutes = 59;
		expect(pipe.transform(minutes)).toBe('59m');
	});
	it('transform should return duration in format "1h: 1m", if incoming number > 60', () => {
		minutes = 61;
		expect(pipe.transform(minutes)).toBe('1h 1m');
	});
});
