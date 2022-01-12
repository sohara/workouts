import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { Card } from '../../components/Card';
import { CircularButton } from '../../components/CircularButton';
import { Workout } from '../../models';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';

type WorkoutsListScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;

export function WorkoutsList({ navigation, route }: WorkoutsListScreenProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  // const { params } = route;
  // const workoutID = params?.workoutID;

  useEffect(() => {
    DataStore.query(Workout).then(setWorkouts);
  }, []);
  console.warn({ workouts });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24 }}>Workouts </Text>
      {workouts.map((workout) => {
        return (
          <Card
            text={workout.name || ''}
            key={workout.id}
            onPress={() => {
              navigation.navigate('Exercises', { workoutID: workout.id });
            }}
          />
        );
      })}
      <CircularButton
        text="+"
        onPress={() => navigation.navigate('Workouts', { screen: 'Create' })}
      />
    </View>
  );
}
