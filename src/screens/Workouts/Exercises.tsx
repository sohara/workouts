import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { Workout } from '../../models';
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
  const { params } = route;
  const workoutID = params?.workoutID;

  useEffect(() => {
    if (!workoutID) {
      return;
    }
    DataStore.query(Workout, workoutID).then(setWorkout);
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
      <Text style={{ fontSize: 24 }}>{workout?.id}</Text>
      <Card text="Goblet Squat" />
      <Card text="Dumbbell Lunge" />
      <CircularButton
        onPress={() => {
          alert('Adding exercise');
          navigation.navigate('AddExercise', { workoutID: workout?.id || '' });
        }}
      />
    </View>
  );
}
