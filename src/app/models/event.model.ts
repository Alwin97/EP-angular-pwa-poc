import {User} from "./user.model";
import {Address} from "./address.model";

export class MyEvent {
  name?: string;
  startTime?: Date;
  endTime?: Date;
  participants?: User[];
  eventType?: number;
  address?: Address;
  _id?: string;

  constructor(event: MyEvent) {
    this.name = event.name;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.participants = event.participants;
    this.eventType = event.eventType;
    this.address = event.address;
    this._id = event._id;
  }
}
