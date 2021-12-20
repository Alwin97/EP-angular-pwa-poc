import {Component, OnInit} from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "./services/newsletter.service";
import {ExerciseService} from "./services/exercise.service";
import {EventService} from "./services/event.service";
import {Subscription} from "rxjs";
import {Training} from "./models/training.model";
import {Exercise} from "./models/exercise.model";
import {ExerciseTypes} from "./enums/exercise-types.enum";
import {ExercisePlan} from "./models/exercisePlan.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = 'BK50oaFrXUMC5p9jknpbzY7tCWuwGkAu6eQYe-UNDuTgmdEHQYiJCVHBuQY21_KpO80ctgvW3Fq_qgB_gl_EDR0';
  subscription: Subscription;
  events: any[];
  exercises: Exercise[];
  currentTraining: Training;
  exercisePlanBackUp: ExercisePlan;


  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private exerciseService: ExerciseService,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.eventService.events.subscribe(events => this.events = events);
    this.subscription = this.exerciseService.exercises.subscribe(exercises => this.exercises = exercises);
  }

  openModal(event): void {
    this.currentTraining = event;
    this.exercisePlanBackUp = new ExercisePlan(JSON.parse(JSON.stringify(this.currentTraining.exercisePlan)));
  }

  fillExercisePlan(): void {
    this.currentTraining.exercisePlan = new ExercisePlan(JSON.parse(JSON.stringify(this.exercisePlanBackUp)));

    const warmUpExercises = this.exercises.filter(e => e.type === ExerciseTypes.WARM_UP && (e.focus === this.currentTraining.exercisePlan.focus || e.focus === null));
    const mainExercises = this.exercises.filter(e => e.type === ExerciseTypes.MAIN && (e.focus === this.currentTraining.exercisePlan.focus || e.focus === null));
    const coolDownExercises = this.exercises.filter(e => e.type === ExerciseTypes.COOL_DOWN && (e.focus === this.currentTraining.exercisePlan.focus || e.focus === null));

    let leftOverWarmUpDuration = this.currentTraining.exercisePlan.warmUpDuration;
    let leftOverMainPartDuration = this.currentTraining.exercisePlan.mainPartDuration;
    let leftOverCoolDownDuration = this.currentTraining.exercisePlan.coolDownDuration;

    this.currentTraining.exercisePlan.warmUpExercises.forEach(ex => leftOverWarmUpDuration = leftOverWarmUpDuration - ex.duration);
    this.currentTraining.exercisePlan.mainPartExercises.forEach(ex => leftOverMainPartDuration = leftOverMainPartDuration - ex.duration);
    this.currentTraining.exercisePlan.coolDownExercises.forEach(ex => leftOverCoolDownDuration = leftOverCoolDownDuration - ex.duration);

    let warmUpIterations = 100;
    let mainPartIterations = 100;
    let coolDownIterations = 100;

    while (leftOverWarmUpDuration >= 0 && warmUpIterations > 0) {
      let exercise = warmUpExercises[Math.floor(Math.random() * warmUpExercises.length)];
      if (leftOverWarmUpDuration - exercise?.duration >= -2 && !this.currentTraining.exercisePlan.warmUpExercises.find(e => e.name === exercise?.name)) {
        this.currentTraining.exercisePlan.warmUpExercises.push(exercise);
        leftOverWarmUpDuration = leftOverWarmUpDuration - exercise?.duration;
      }
      warmUpIterations--;
    }

    while (leftOverMainPartDuration >= 0 && mainPartIterations > 0) {
      let exercise = mainExercises[Math.floor(Math.random() * mainExercises.length)];
      if (leftOverMainPartDuration - exercise?.duration >= -5 && !this.currentTraining.exercisePlan.mainPartExercises.find(e => e.name === exercise?.name)) {
        this.currentTraining.exercisePlan.mainPartExercises.push(exercise);
        leftOverMainPartDuration = leftOverMainPartDuration - exercise?.duration;
      }
      mainPartIterations--;
    }

    while (leftOverCoolDownDuration >= 0 && coolDownIterations > 0) {
      let exercise = coolDownExercises[Math.floor(Math.random() * coolDownExercises.length)];
      if (leftOverCoolDownDuration - exercise?.duration >= -2 && !this.currentTraining.exercisePlan.coolDownExercises.find(e => e.name === exercise?.name)) {
        this.currentTraining.exercisePlan.coolDownExercises.push(exercise);
        leftOverCoolDownDuration = leftOverCoolDownDuration - exercise?.duration;
      }
      coolDownIterations--;
    }
  }

  addExercise(exercise: Exercise): void {
    switch (exercise.type) {
      case ExerciseTypes.WARM_UP:
        let leftOverWarmUpDuration = this.currentTraining.exercisePlan.warmUpDuration;
        this.currentTraining.exercisePlan.warmUpExercises.forEach(ex => leftOverWarmUpDuration = leftOverWarmUpDuration - ex.duration);
        if (leftOverWarmUpDuration - exercise?.duration >= -2 && !this.currentTraining.exercisePlan.warmUpExercises.find(e => e.name === exercise?.name)) {
          this.currentTraining.exercisePlan.warmUpExercises.push(exercise);
          this.exercisePlanBackUp.warmUpExercises.push(exercise);
        }
        break;
      case ExerciseTypes.MAIN:
        let leftOverMainPartDuration = this.currentTraining.exercisePlan.mainPartDuration;
        this.currentTraining.exercisePlan.mainPartExercises.forEach(ex => leftOverMainPartDuration = leftOverMainPartDuration - ex.duration);
        if (leftOverMainPartDuration - exercise?.duration >= -5 && !this.currentTraining.exercisePlan.mainPartExercises.find(e => e.name === exercise?.name)) {
          this.currentTraining.exercisePlan.mainPartExercises.push(exercise);
          this.exercisePlanBackUp.mainPartExercises.push(exercise);
        }
        break;
      case ExerciseTypes.COOL_DOWN:
        let leftOverCoolDownDuration = this.currentTraining.exercisePlan.coolDownDuration;
        this.currentTraining.exercisePlan.coolDownExercises.forEach(ex => leftOverCoolDownDuration = leftOverCoolDownDuration - ex.duration);
        if (leftOverCoolDownDuration - exercise?.duration >= -2 && !this.currentTraining.exercisePlan.coolDownExercises.find(e => e.name === exercise?.name)) {
          this.currentTraining.exercisePlan.coolDownExercises.push(exercise);
          this.exercisePlanBackUp.coolDownExercises.push(exercise);
        }
        break;
    }
  }

  removeExercise(exercise: Exercise): void {
    switch (exercise.type) {
      case ExerciseTypes.WARM_UP:
        this.currentTraining.exercisePlan.warmUpExercises.splice(this.currentTraining.exercisePlan.warmUpExercises.indexOf(exercise),1);
        this.exercisePlanBackUp.warmUpExercises.splice(this.exercisePlanBackUp.warmUpExercises.indexOf(exercise),1);
        break;
      case ExerciseTypes.MAIN:
        this.currentTraining.exercisePlan.mainPartExercises.splice(this.currentTraining.exercisePlan.mainPartExercises.indexOf(exercise),1);
        this.exercisePlanBackUp.mainPartExercises.splice(this.exercisePlanBackUp.mainPartExercises.indexOf(exercise),1);
        break;
      case ExerciseTypes.COOL_DOWN:
        this.currentTraining.exercisePlan.coolDownExercises.splice(this.currentTraining.exercisePlan.coolDownExercises.indexOf(exercise),1);
        this.exercisePlanBackUp.coolDownExercises.splice(this.exercisePlanBackUp.coolDownExercises.indexOf(exercise),1);
        break;
    }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({serverPublicKey: this.VAPID_PUBLIC_KEY})
      .then(sub => {
        this.newsletterService.addPushSubscriber(sub);
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
