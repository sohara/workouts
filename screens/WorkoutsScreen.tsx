import { Pressable, StyleSheet } from 'react-native';
import { DataStore } from 'aws-amplify';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Workout } from '../models';
import React, { useEffect, useState } from 'react';
import { ConsoleLogger } from '@aws-amplify/core';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      {/* <Text 
        // onPress={() => {
        //   DataStore.save(
        //     new Workout({ name: `Workout - ${new Date().toISOString()}` })
        //   );
        // }}
      //   onPress={() => {
      //     navigation.navigate('Workouts', { screen: 'Create' });
      //     console.warn('tried to navigate');
      //   }}
      //   style={{}}
      // > */}
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
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
