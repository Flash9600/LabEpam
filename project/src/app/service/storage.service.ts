import { Inject, Injectable, InjectionToken } from '@angular/core';

const BROWSER_STORAGE = new InjectionToken<Storage>('Storage',
{
	providedIn: 'root',
	factory: () => localStorage
});

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(@Inject(BROWSER_STORAGE) protected storage: Storage){}
	public setValue<T>(name: string, value: T): void{
		this.storage.setItem(name, JSON.stringify(value));
	}

	public getValue<T>(name: string): T{
		return JSON.parse(this.storage.getItem(name));
	}

	public deleteValue(name: string): void {
		this.storage.removeItem(name);
	}
}
