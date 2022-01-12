import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../../App';
import { Exercise, Workout } from '../../models';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { CircularButton } from '../../components/CircularButton';
import { WorkoutStep } from '../../models';

type WorkoutsAddExerciseScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;
export function WorkoutsAddExercise({
  navigation,
  route,
}: WorkoutsAddExerciseScreenProps) {
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseID, setSelectedExerciseID] = useState<string | null>(
    null
  );
  const [sets, setSets] = useState(6);
  const [repsMin, setRepsMin] = useState(4);
  const [repsMax, setRepsMax] = useState(6);

  const { params } = route;
  const workoutID = params?.workoutID;

  useEffect(() => {
    if (!workoutID) {
      return;
    }
    DataStore.query(Workout, workoutID).then(setWorkout);
    DataStore.query(Exercise).then(setExercises);
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
      <Text style={{ fontSize: 24 }}>Add Exercise</Text>
      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 18 }}>Exercise</Text>
        <Picker
          selectedValue={selectedExerciseID}
          onValueChange={(itemValue) => {
            console.warn('selecting', itemValue);
            setSelectedExerciseID(itemValue);
          }}
          mode="dropdown"
          style={styles.picker}
        >
          {exercises.map((exercise) => (
            <Picker.Item
              label={exercise.name}
              value={exercise.id}
              key={exercise.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.fieldTitle}>Sets</Text>
      <NumberPicker value={sets} setValue={setSets} />

      <Text style={styles.fieldTitle}>Rep Ranage</Text>
      <NumberPicker value={repsMin} setValue={setRepsMin} />

      <NumberPicker value={repsMax} setValue={setRepsMax} />

      <Button
        title="Save ->"
        disabled={false}
        onPress={async () => {
          const exercise = exercises.find((e) => e.id === selectedExerciseID);
          if (exercise && selectedExerciseID && workoutID) {
            await DataStore.save(
              new WorkoutStep({
                workoutID: workoutID,
                Exercise: exercise,
                workoutStepExerciseId: selectedExerciseID,
                sets,
                repsMin,
                repsMax,
              })
            );
            navigation.navigate('Exercises', { workoutID });
          }

          alert('missing exercise or workoutID');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    marginVertical: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#666',
  },
  fieldTitle: {
    fontSize: 24,
  },
});

function NumberPicker({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
      }}
    >
      <CircularButton
        text="-"
        onPress={() => {
          const newValue = value - 1;
          if (newValue > 0) {
            setValue(newValue);
          }
        }}
      />
      <View
        style={{
          width: 60,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            alignContent: 'center',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 'bold',
            lineHeight: 64,
            textAlign: 'center',
          }}
        >
          {`${value}`}
        </Text>
      </View>
      <CircularButton
        text="+"
        onPress={() => {
          setValue(value + 1);
        }}
      />
    </View>
  );
}
