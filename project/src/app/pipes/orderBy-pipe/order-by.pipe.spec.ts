import { OrderByPipe } from './order-by.pipe';

type sortObj = { value: string | number };

describe('OrderByPipe', () => {

	let pipe: OrderByPipe;

	let a: sortObj = { value: 1 };
	let b: sortObj = { value: 2 };
	let c: sortObj = { value: 3 };

	beforeEach(() => {
		pipe = new OrderByPipe();
	});

	it('transform should return sort number array', () => {
		expect(pipe.transform<sortObj>([c, b, a], 'value')
		).toEqual([a, b, c]);
	});

	it('transform should return sort string array', () => {
		a = { value: 'a' };
		b = { value: 'd' };
		c = { value: 'g' };
		expect(pipe.transform<sortObj>([c, b, a], 'value')
		).toEqual([a, b, c]);
	});
});
