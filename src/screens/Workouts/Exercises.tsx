import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import { Workout, WorkoutStep } from '../../models';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';
import { Card } from '../../components/Card';
import { CircularButton } from '../../components/CircularButton';
import { FlatList } from 'react-native-gesture-handler';

type WorkoutsExercisesScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList, 'Exercises'>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;
export function WorkoutsExercises({
  navigation,
  route,
}: WorkoutsExercisesScreenProps) {
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  const [workoutSteps, setWorkoutSteps] = useState<WorkoutStep[]>([]);
  const { workoutID } = route.params;

  useEffect(() => {
    if (!workoutID) {
      return;
    }
    DataStore.query(Workout, workoutID).then(setWorkout);
    onWorkoutStepsQuery();
    DataStore.observeQuery(WorkoutStep, (ws) =>
      ws.workoutID('eq', workoutID)
    ).subscribe(() => {
      onWorkoutStepsQuery();
    });
  }, [workoutID]);

  const onWorkoutStepsQuery = async () => {
    const freshWorkoutSteps = await DataStore.query(WorkoutStep, (ws) =>
      ws.workoutID('eq', workoutID)
    );
    setWorkoutSteps(freshWorkoutSteps);
  };
  const renderItem = ({ item }: { item: WorkoutStep }) => {
    return (
      <View style={{ paddingBottom: 20 }}>
        <Card
          title={`${item.Exercise.name}`}
          description={`${item.sets} sets x ${item.repsMin} - ${item.repsMax} reps`}
          key={item.id}
          onPress={() => {
            navigation.navigate('AddExercise', {
              workoutID: workout?.id || '',
              workoutStepID: item.id,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24, paddingTop: 40, paddingBottom: 40 }}>
        {workout?.name}
      </Text>
      <View
        style={{
          width: '90%',
        }}
      >
        <FlatList
          data={workoutSteps}
          renderItem={renderItem}
          style={{
            width: '100%',
          }}
        />
      </View>
      <CircularButton
        text="+"
        onPress={() => {
          navigation.navigate('AddExercise', { workoutID: workout?.id || '' });
        }}
      />
    </View>
  );
}
