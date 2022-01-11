import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DataStore } from 'aws-amplify';
import { RootStackParamList } from '../../../App';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Workout } from '../../models';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type WorkoutsCreateScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;
export function WorkoutsCreate({ navigation }: WorkoutsCreateScreenProps) {
  const [name, setName] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24 }}>Add a Workout</Text>
      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 24 }}>Name:</Text>
        <TextInput onChangeText={setName} style={styles.input} />
      </View>

      <Button
        disabled={!name}
        onPress={async () => {
          const workout = await DataStore.save(new Workout({ name }));
          console.warn({ workout });
          //   navigation.navigate('Workouts', {
          //     screen: 'Exercises',
          //     params: { workoutID: workout.id },
          //   });
          navigation.navigate('Exercises', { workoutID: workout.id });
        }}
        title="Continue ->"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
});
