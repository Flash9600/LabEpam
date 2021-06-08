import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable()
export class StorageService {
	constructor(@Inject(LOCAL_STORAGE) protected storage: Storage){}

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
