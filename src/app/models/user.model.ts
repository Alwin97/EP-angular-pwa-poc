import {Address} from "./address.model";

export class User {
  name?: string;
  surname?: string;
  address?: Address;
  birthdate?: Date;
  role?: number;
  _id?: string

  constructor(user: User) {
    this.name = user.name;
    this.surname = user.surname;
    this.address = user.address;
    this.birthdate = user.birthdate;
    this.role = user.role;
    this._id = user._id;
  }
}
