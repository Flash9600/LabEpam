import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	public setValue<T>(name: string, value: T): void{
		window.localStorage.setItem(name, JSON.stringify(value));
	}

	public getValue<T>(name: string): T{
		return JSON.parse(window.localStorage.getItem(name));
	}

	public deleteValue(name: string): void {
		localStorage.removeItem(name);
	}
}
