// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { WorkoutStep, Exercise, Workout } = initSchema(schema);

export {
  WorkoutStep,
  Exercise,
  Workout
};