import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { Workout } from '../models';
import { RootStackScreenProps, WorkoutsStackParamList } from '../types';

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Create'>;

export function WorkoutsCreate({ navigation }: Props) {
  const [name, setName] = useState('');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}
    >
      <Text>Create Screen</Text>
      <TextInput
        onChangeText={setName}
        placeholder="Workout name"
        style={styles.input}
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
