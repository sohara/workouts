import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { Card } from '../../components/Card';
import { CircularButton } from '../../components/CircularButton';
import { WorkoutsStackParamList } from '../WorkoutsStackScreen';

type WorkoutsListScreenProps = CompositeScreenProps<
  StackScreenProps<WorkoutsStackParamList>,
  BottomTabScreenProps<RootStackParamList, 'Workouts'>
>;

export function WorkoutsList({ navigation, route }: WorkoutsListScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontSize: 24 }}>Workouts </Text>
      <Card text="Push 1" />
      <Card text="Pull 1" />
      <CircularButton
        onPress={() => navigation.navigate('Workouts', { screen: 'Create' })}
      />
    </View>
  );
}
