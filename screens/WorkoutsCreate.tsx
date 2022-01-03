import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Workout } from '../models';
import { RootStackScreenProps, WorkoutsStackParamList } from '../types';

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Create'>;

export function WorkoutsCreate({ navigation }: Props) {
  const [name, setName] = useState('');
  console.warn({ name });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Create Screen</Text>
      <TextInput
        onChangeText={setName}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: 300,
        }}
      />
      <Pressable
        onPress={async () => {
          console.warn('pressed');
          await DataStore.save(new Workout({ name }));
          navigation.navigate('WorkoutsList');
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
        disabled={!name}
      >
        <Text>Go</Text>
      </Pressable>
    </View>
  );
}
