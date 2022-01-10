import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { Button } from '../components/Button';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export function HomeScreen({ navigation, route }: HomeScreenProps) {
  // console.warn({ route });
  // const state = useNavigationState((state) => state);
  // console.warn({ state });
  return (
    <View style={styles.container}>
      {/* <Text>Home Screen</Text> */}
      <Button
        title="Workout Now!"
        onPress={() => {
          alert('pressed');
        }}
      />
      <Button
        title="Manage Workouts"
        onPress={
          () => navigation.navigate('Workouts', { screen: 'List' })
          //   navigation.navigate('Details', {
          //     itemID: 86,
          //     otherParam: 'foo',
          //   })
        }
      />
      {/* <Button
        title="Go to Messages"
        onPress={() => navigation.navigate('Home', { screen: 'Messages' })}
      /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
