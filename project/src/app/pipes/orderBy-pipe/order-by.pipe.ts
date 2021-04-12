import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

	transform<T extends {date?: Date, title?: string}>(coursesArr: T[], property: string): T[] {

		return coursesArr.sort((a: T, b: T) => {
			const valueA = a[property];
			const valueB = b[property];
			if (valueA > valueB) {
				return 1;
			}
			if (valueA < valueB) {
				return -1;
			}
		});
	}

}


