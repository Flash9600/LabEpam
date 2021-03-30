import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {

	let pipe: OrderByPipe;

 const a = {value: 1};
 const b = {value: 2};
 const c = {value: 3};

	beforeEach(() => {
			pipe = new OrderByPipe();
		});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});
 it('should return sort array', () => {
		expect(pipe.transform<{value: number, date?: Date, title?: string}>([c, b, a], 'value')
		).toEqual([a, b, c]);
	});
});
