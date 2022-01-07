import { Pressable, StyleSheet } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Workout } from '../models';
import React, { useEffect, useState } from 'react';
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'Workouts'>) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    DataStore.clear();
    const subscription = DataStore.observeQuery(Workout).subscribe(
      (snapshot) => {
        const { isSynced, items } = snapshot;
        console.warn({ items, isSynced });
        setWorkouts(items);
      }
    );

    return () => subscription.unsubscribe();
  }, []);
  Auth.currentSession().then((res) => {
    console.warn('user', res);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <Pressable
        onPress={() => navigation.navigate('Workouts', { screen: 'Create' })}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Text>Create Workout</Text>
      </Pressable>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Workouts</Text>
      {workouts.map((workout) => (
        <Text key={workout.id}>{workout.name}</Text>
      ))}
      <Pressable
        onPress={() => {
          Auth.signOut();
        }}
        style={({ pressed }) => ({
          ...styles.button,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#444',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
