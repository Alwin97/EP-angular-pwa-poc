import {Equipment} from "./equipment.model";

export class Exercise {
  name?: string;
  description?: string;
  player?: number;
  duration?: number;
  equipment?: Equipment[];
  focus?: string;
  type?: number;

  constructor(exercise: Exercise) {
    this.name = exercise.name;
    this.description = exercise.description;
    this.player = exercise.player;
    this.duration = exercise.duration;
    this.equipment = exercise.equipment;
    this.focus = exercise.focus;
    this.type = exercise.type;
  }
}
