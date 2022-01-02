import { StyleSheet } from 'react-native';
import { DataStore } from 'aws-amplify';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Workout } from '../models';
import { useEffect, useState } from 'react';
import { ConsoleLogger } from '@aws-amplify/core';
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
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
      <Text style={styles.title}>Tab One</Text>
      <Text
        onPress={() => {
          DataStore.save(
            new Workout({ name: `Workout - ${new Date().toISOString()}` })
          );
        }}
        style={{}}
      >
        Create Workout
      </Text>
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
