import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { WorkoutsCreate } from './Workouts/Create';
import { WorkoutsList } from './Workouts/List';

export type WorkoutsStackParamList = {
  List: undefined;
  Create: undefined;
  Exercises: undefined;
  AddExercise: undefined;
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
    </WokroutsStack.Navigator>
  );
}
