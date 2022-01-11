import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorkoutStepMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ExerciseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkoutMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WorkoutStep {
  readonly id: string;
  readonly Exercise: Exercise;
  readonly workoutID?: string;
  readonly sets: number;
  readonly repsMin: number;
  readonly repsMax: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly workoutStepExerciseId: string;
  constructor(init: ModelInit<WorkoutStep, WorkoutStepMetaData>);
  static copyOf(source: WorkoutStep, mutator: (draft: MutableModel<WorkoutStep, WorkoutStepMetaData>) => MutableModel<WorkoutStep, WorkoutStepMetaData> | void): WorkoutStep;
}

export declare class Exercise {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Exercise, ExerciseMetaData>);
  static copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise, ExerciseMetaData>) => MutableModel<Exercise, ExerciseMetaData> | void): Exercise;
}

export declare class Workout {
  readonly id: string;
  readonly name?: string;
  readonly owner?: string;
  readonly WorkoutSteps?: (WorkoutStep | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Workout, WorkoutMetaData>);
  static copyOf(source: Workout, mutator: (draft: MutableModel<Workout, WorkoutMetaData>) => MutableModel<Workout, WorkoutMetaData> | void): Workout;
}