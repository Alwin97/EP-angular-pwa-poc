import {Injectable} from '@angular/core';
import {MyEvent} from "../models/event.model";
import eventsJson from "src/app/mocks/events-mock-data.json";
import {BehaviorSubject} from "rxjs";
import {EventTypes} from "../enums/event-types.enum";
import {Training} from "../models/training.model";
import {Game} from "../models/game.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor() {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const tempEvents: any[] = eventsJson.events.map(e => {
      switch (e.eventType) {
        case EventTypes.TRAINING:
          // @ts-ignore
          return new Training(e);
        case EventTypes.GAME:
          // @ts-ignore
          return new Game(e);
        default:
          // @ts-ignore
          return new MyEvent(e);
      }
    });
    this.events.next(tempEvents);
  }
}
