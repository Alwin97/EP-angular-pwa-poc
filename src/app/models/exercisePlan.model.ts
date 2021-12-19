import {Exercise} from "./exercise.model";

export class ExercisePlan {
  warmUpDuration?: string;
  mainPartDuration?: number;
  coolDownDuration?: number;
  warmUpExercises?: Exercise[];
  mainPartExercises?: Exercise[];
  coolDownExercises?: Exercise[];

  constructor(exercisePlan: ExercisePlan) {
    this.warmUpDuration = exercisePlan.warmUpDuration;
    this.mainPartDuration = exercisePlan.mainPartDuration;
    this.coolDownDuration = exercisePlan.coolDownDuration;
    this.warmUpExercises = exercisePlan.warmUpExercises;
    this.mainPartExercises = exercisePlan.mainPartExercises;
    this.coolDownExercises = exercisePlan.coolDownExercises;
  }
}
