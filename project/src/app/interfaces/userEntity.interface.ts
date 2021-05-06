export interface IUser {
	id?: number;
	email: string;
	password: string;
}

export class User{
	id: number;
	email: string;
	password: string;
	constructor( user: IUser ) {
		this.email = user.email;
		this.password = user.password;
	}
}
