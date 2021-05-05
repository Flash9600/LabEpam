export interface ICourse {
	id: number;
	title: string;
	date: Date;
	duration: number;
	description: string;
	isTopRated: boolean;
}

export class Course {
	public id: number;
	public title: string;
	public date: Date;
	public duration: number;
	public description: string;
	public isTopRated: boolean;

	constructor( course: ICourse ) {
		this.id = course.id;
		this.title = course.title;
		this.date = new Date(course.date);
		this.duration = course.duration;
		this.description = course.description;
		this.isTopRated = course.isTopRated;
	}
}
