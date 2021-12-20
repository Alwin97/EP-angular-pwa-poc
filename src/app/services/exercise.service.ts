import {Injectable} from '@angular/core';
import {Exercise} from "../models/exercise.model";
import exercisesJson from "src/app/mocks/exercises-mock-data.json";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(null)

  constructor() {
    this.fetchExercises();
  }

  fetchExercises(): void {
    const tempExercises = exercisesJson.exercises.map(e => new Exercise(e));
    this.exercises.next(tempExercises);
  }
}
