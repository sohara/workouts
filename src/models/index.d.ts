import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorkoutMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Workout {
  readonly id: string;
  readonly name?: string;
  readonly owner?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Workout, WorkoutMetaData>);
  static copyOf(source: Workout, mutator: (draft: MutableModel<Workout, WorkoutMetaData>) => MutableModel<Workout, WorkoutMetaData> | void): Workout;
}