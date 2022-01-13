import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import { Exercise, Workout } from '../../models';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { CircularButton } from '../../components/CircularButton';
import { WorkoutStep } from '../../models';
import { SelectPicker } from '../../components/SelectPicker';

type WorkoutsAddExerciseScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList, 'AddExercise'>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;
export function WorkoutsAddExercise({
  navigation,
  route,
}: WorkoutsAddExerciseScreenProps) {
  //   const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  const [workoutStep, setWorkoutStep] = useState<WorkoutStep | undefined>(
    undefined
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseID, setSelectedExerciseID] = useState<string | null>(
    null
  );
  //   const [exercise, setExercise] = useState<Exercise | undefined>(undefined);
  const [sets, setSets] = useState(3);
  const [repsMin, setRepsMin] = useState(4);
  const [repsMax, setRepsMax] = useState(6);
  const [selectOpen, setSelectOpen] = useState(false);

  const { workoutID, workoutStepID } = route.params;
  //   const workoutID = params.workoutID;
  //   const workoutStepID = params.workoutStepID;
  const exercise = useMemo(() => {
    return exercises.find((m) => m.id === selectedExerciseID);
  }, [exercises, selectedExerciseID]);

  useEffect(() => {
    // DataStore.query(Workout, workoutID).then(setWorkout);
    DataStore.query(Exercise).then(setExercises);
    const setWorkoutStepValues = async () => {
      if (workoutStepID) {
        const result = await DataStore.query(WorkoutStep, workoutStepID);
        if (result) {
          setWorkoutStep(result);
          setSets(result.sets);
          setRepsMax(result.repsMax);
          setRepsMin(result.repsMin);
          //   set
          setSelectedExerciseID(result.workoutStepExerciseId);
        }
      }
    };
    setWorkoutStepValues();
  }, []);

  // Ensure min reps is at least eq to max reps
  useEffect(() => {
    if (repsMin > repsMax) {
      setRepsMax(repsMin);
    }
  }, [repsMin, repsMax]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24, paddingVertical: 10 }}>Workout Step</Text>
      <Pressable
        style={{
          padding: 10,
          borderWidth: 1,
          marginBottom: 20,
        }}
        onPress={() => {
          setSelectOpen(true);
        }}
      >
        <Text style={{ fontSize: 24 }}>{exercise?.name}</Text>
      </Pressable>
      <SelectPicker
        modalOpen={selectOpen}
        options={exercises.map((e) => ({ label: e.name, value: e.id }))}
        setModalOpen={(open) => setSelectOpen(open)}
        setValue={(value) => setSelectedExerciseID(value)}
        value={selectedExerciseID ?? ''}
      />

      <Text style={styles.fieldTitle}>Sets</Text>
      <NumberPicker value={sets} setValue={setSets} />

      <Text style={styles.fieldTitle}>Rep Ranage</Text>
      <NumberPicker value={repsMin} setValue={setRepsMin} />

      <NumberPicker value={repsMax} setValue={setRepsMax} />

      <Button
        title="Save ->"
        disabled={false}
        onPress={async () => {
          //   const exercise = exercises.find((e) => e.id === selectedExerciseID);
          if (exercise && selectedExerciseID && workoutID) {
            let workoutStepToSave;
            if (workoutStep) {
              workoutStepToSave = WorkoutStep.copyOf(workoutStep, (updated) => {
                updated.sets = sets;
                updated.repsMax = repsMax;
                updated.repsMin = repsMin;
                updated.Exercise = exercise;
                updated.workoutStepExerciseId = selectedExerciseID;
              });
            } else {
              workoutStepToSave = new WorkoutStep({
                workoutID: workoutID,
                Exercise: exercise,
                workoutStepExerciseId: selectedExerciseID,
                sets,
                repsMin,
                repsMax,
              });
            }

            await DataStore.save(workoutStepToSave);
            navigation.navigate('Exercises', { workoutID });
          } else {
            alert('missing exercise or workoutID');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    // marginVertical: 20,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: '#666',
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
