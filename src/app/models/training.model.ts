import {Team} from "./team.model";
import {MyEvent} from "./event.model";
import {ExercisePlan} from "./exercisePlan.model";
import {User} from "./user.model";

export class Training extends MyEvent {
  team?: Team;
  trainer?: User;
  exercisePlan?: ExercisePlan;

  constructor(training: Training) {
    super(training);
    this.team = training.team;
    this.trainer = training.trainer;
    this.exercisePlan = training.exercisePlan;
  }
}
