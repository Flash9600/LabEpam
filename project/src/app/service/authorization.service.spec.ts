import { AuthorizationService } from './authorization.service';
import { StorageService } from './storage.service';


describe('AuthorizationService', () => {

	let service: AuthorizationService;
	let serviceSpy: AuthorizationService;
	// tslint:disable-next-line:no-any
	let storageServiceFake: any;
	// tslint:disable-next-line:no-any
	let storageServiceSpy: any;
	let email = 'user@mail.com';
	const password = 'password123';
	storageServiceFake = {
		getValue: () => undefined,
		setValue: () => undefined,
		deleteValue: () => undefined
	};
	storageServiceSpy = {...storageServiceFake};
	beforeEach(() => {
		service = new AuthorizationService(storageServiceFake as StorageService);
		spyOn(storageServiceSpy, 'getValue');
		serviceSpy = new AuthorizationService(storageServiceSpy as StorageService);
	});

	describe('IsAuthenticated method', () => {

		it('IsAuthenticated method should call getValue from StorageService with "user"', () => {
			serviceSpy.IsAuthenticated;
			expect(storageServiceSpy.getValue).toHaveBeenCalledWith('user');
		});
		it('IsAuthenticated method should return false', () => {
			expect(service.IsAuthenticated).toBeFalse;
		});
		it('IsAuthenticated method should return true', () => {
			storageServiceFake.getValue = () => 'userName';
			expect(service.IsAuthenticated).toBeTrue;
		});
	});

	describe('getUserInfo method', () => {

		it('getUserInfo method should return "flagTrue" when IsAuthenticated = true', () => {
			storageServiceSpy.getValue.and.returnValue({email: 'flagTrue'});
			expect(serviceSpy.getUserInfo()).toBe('flagTrue');
		});

		it('getUserInfo method should return empty string when IsAuthenticated = false', () => {
			storageServiceSpy.getValue.and.returnValue(undefined);
			expect(serviceSpy.getUserInfo()).toBe('');
		});

	});
	describe('LogOut method', () => {

		it('LogOut method should call storageService.deleteValue function', () => {
			spyOn(storageServiceSpy, 'deleteValue');
			serviceSpy.logOut();
			expect(storageServiceSpy.deleteValue).toHaveBeenCalled;
		});
	});

	describe('LogIn method', () => {
		it('LogIn method should return true when function arguments are invalid', () => {
			expect(service.logIn('email', 'password')).toBeTrue;
		});

		it('LogIn method should return false when function arguments are valid', () => {
			expect(service.logIn(email, password)).toBeFalse;
		});

		it('LogIn method should return false when function arguments are valid', () => {
			spyOn(storageServiceSpy, 'setValue');
			serviceSpy.logIn(email, password);
			expect(storageServiceSpy.setValue).toHaveBeenCalled;
		});
	});

	describe('isValidData method', () => {
		it('isValidData method should return true when function arguments are valid', () => {
			// tslint:disable-next-line:no-any
			const result = (service as any).isValidData(email, password);
			expect(result).toBeTrue;
		});

		it('isValidData method should return false when function arguments are invalid', () => {
			email = 'user';
			// tslint:disable-next-line:no-any
			const result = (service as any).isValidData(email, password);
			expect(result).toBeFalse;
		});
	});
});


