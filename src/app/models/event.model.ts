import {User} from "./user.model";
import {Adress} from "./adress.model";

export class MyEvent {
  name?: string;
  startTime?: Date;
  endTime?: Date;
  participants?: User[];
  eventType?: number;
  adress?: Adress;
  _id?: string;

  constructor(event: MyEvent) {
    this.name = event.name;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.participants = event.participants;
    this.eventType = event.eventType;
    this.adress = event.adress;
    this._id = event._id;
  }
}
