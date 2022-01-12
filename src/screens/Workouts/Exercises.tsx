import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { Workout, WorkoutStep } from '../../models';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';
import { Card } from '../../components/Card';
import { CircularButton } from '../../components/CircularButton';

type WorkoutsExercisesScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;
export function WorkoutsExercises({
  navigation,
  route,
}: WorkoutsExercisesScreenProps) {
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  const [workoutSteps, setWorkoutSteps] = useState<WorkoutStep[]>([]);
  const { params } = route;
  const workoutID = params?.workoutID;

  useEffect(() => {
    if (!workoutID) {
      return;
    }
    DataStore.query(Workout, workoutID).then(setWorkout);
    DataStore.query(WorkoutStep, (ws) => ws.workoutID('eq', workoutID)).then(
      setWorkoutSteps
    );
  }, [workoutID]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24 }}>{workout?.name}</Text>
      {workoutSteps.map((workoutStep) => (
        <Card
          text={`${workoutStep.Exercise.name} - ${workoutStep.sets} sets x ${workoutStep.repsMin} - ${workoutStep.repsMax} reps`}
          key={workoutStep.id}
        />
      ))}
      <CircularButton
        text="+"
        onPress={() => {
          navigation.navigate('AddExercise', { workoutID: workout?.id || '' });
        }}
      />
    </View>
  );
}
