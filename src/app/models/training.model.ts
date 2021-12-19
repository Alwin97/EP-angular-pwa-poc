import {Team} from "./team.model";
import {MyEvent} from "./event.model";
import {ExercisePlan} from "./exercisePlan.model";

export class Training extends MyEvent {
  team?: Team;
  exercisePlan?: ExercisePlan;

  constructor(training: Training) {
    super(training);
    this.team = training.team;
    this.exercisePlan = training.exercisePlan;
  }
}
