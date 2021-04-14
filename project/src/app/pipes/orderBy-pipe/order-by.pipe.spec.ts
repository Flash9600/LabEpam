import { OrderByPipe } from './order-by.pipe';

type SortObj = { value: string | number };

describe('OrderByPipe', () => {

	let pipe: OrderByPipe;

	let a: SortObj = { value: 1 };
	let b: SortObj = { value: 2 };
	let c: SortObj = { value: 3 };

	beforeEach(() => {
		pipe = new OrderByPipe();
	});

	it('transform should return sort number array, if incoming number array is not sorted', () => {
		expect(pipe.transform<SortObj>([c, b, a], 'value')
		).toEqual([a, b, c]);
	});

	it('transform should return sort string array, if incoming string array is not sorted', () => {
		a = { value: 'a' };
		b = { value: 'd' };
		c = { value: 'g' };
		expect(pipe.transform<SortObj>([c, b, a], 'value')
		).toEqual([a, b, c]);
	});
});
