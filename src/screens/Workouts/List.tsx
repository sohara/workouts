import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { Card } from '../../components/Card';

type WorkoutsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Workouts'
>;
export function WorkoutsList({ navigation }: WorkoutsListScreenProps) {
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
      <Pressable
        style={{
          borderWidth: 2,
          borderRadius: 50,
          padding: 0,
          width: 60,
          height: 60,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Workouts', { screen: 'Create' })}
      >
        <Text style={{ fontSize: 44 }}>+</Text>
      </Pressable>
    </View>
  );
}
