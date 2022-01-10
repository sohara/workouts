import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DataStore } from 'aws-amplify';
import { RootStackParamList } from '../../../App';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Workout } from '../../models';

type WorkoutsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Workouts'
>;
export function WorkoutsCreate({ navigation }: WorkoutsListScreenProps) {
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
          await DataStore.save(new Workout({ name }));
          alert('adding');
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
