import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { WorkoutsAddExercise } from './Workouts/AddExercise';
import { WorkoutsCreate } from './Workouts/Create';
import { WorkoutsExercises } from './Workouts/Exercises';
import { WorkoutsList } from './Workouts/List';

export type WorkoutsStackParamList = {
  List: undefined;
  Create: undefined;
  Exercises: { workoutID: string };
  AddExercise: { workoutID: string };
};

const WokroutsStack = createNativeStackNavigator<WorkoutsStackParamList>();

export function WorkoutStackScreen() {
  return (
    <WokroutsStack.Navigator>
      <WokroutsStack.Screen
        name="List"
        options={{ headerShown: true }}
        component={WorkoutsList}
      />
      <WokroutsStack.Screen
        name="Create"
        options={{ headerShown: true }}
        component={WorkoutsCreate}
      />
      <WokroutsStack.Screen
        name="Exercises"
        options={{ headerShown: true }}
        component={WorkoutsExercises}
      />
      <WokroutsStack.Screen
        name="AddExercise"
        options={{ headerShown: true }}
        component={WorkoutsAddExercise}
      />
    </WokroutsStack.Navigator>
  );
}
