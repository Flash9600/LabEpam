// tslint:disable:no-any
import { StorageService } from './storage.service';

describe('StorageService', () => {
	let serviceSpy: StorageService;
	let storageSpy: any;
	const user = { name: 'Vladimir' };
	const userString = JSON.stringify(user);
	beforeEach(() => {
		storageSpy = jasmine.createSpyObj('Storage', ['setItem', 'getItem', 'removeItem']);
		serviceSpy = new StorageService(storageSpy);
	});

	it('setValue should call setItem method of LocalStorage with arguments type - string', () => {
		serviceSpy.setValue('user', user);
		expect(storageSpy.setItem).toHaveBeenCalledWith('user', userString);
	});

	it('getValue should return value from LocalStorage by method`s argument', () => {
		storageSpy.getItem.and.returnValue(userString);
		expect(serviceSpy.getValue<{ name: string }>('user').name).toEqual(user.name);
	});

	it('deleteValue should remove value from LocalStorage by method`s argument', () => {
		serviceSpy.deleteValue('user');
		expect(storageSpy.removeItem).toHaveBeenCalledWith('user');
	});
});
