import Amplify, { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigationState,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Button as MyButton } from './src/components/Button';
import awsconfig from './src/aws-exports';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/Home';
import { Workout } from './src/models';
import {
  HomeStackParamList,
  HomeStackScreen,
} from './src/screens/HomeStackScreen';
import {
  WorkoutsStackParamList,
  WorkoutStackScreen,
} from './src/screens/WorkoutsStackScreen';
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  // Details: { itemID: number; otherParam: 'foo' | 'bar' };
  Workouts: NavigatorScreenParams<WorkoutsStackParamList>;
  // Details: undefined;
  Logs: undefined;
};

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
function Details({ navigation, route }: DetailsScreenProps) {
  // const { itemID, otherParam } = route.params;
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      {/* <Text>itemID: {JSON.stringify(itemID)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
      {/* <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.navigate('Details', {
            itemID: 86,
            otherParam: 'foo',
          })
        }
      /> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const RootStack = createBottomTabNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // headerStyle: { backgroundColor: '#f4511e' },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }}
      >
        <RootStack.Screen
          name="Home"
          component={HomeStackScreen}
        ></RootStack.Screen>
        <RootStack.Screen
          name="Workouts"
          component={WorkoutStackScreen}
          // options={({ route }) => ({ title: route.params.itemID })}
          // options={(options) => {
          //   console.warn({ itemID: options.route.params.itemID });
          //   return { title: `item ${options.route.params.itemID}` };
          // }}
        ></RootStack.Screen>
        <RootStack.Screen
          name="Logs"
          // component={Details}
          // options={({ route }) => ({ title: route.params.itemID })}
          // options={(options) => {
          //   console.warn({ itemID: options.route.params.itemID });
          //   return { title: `item ${options.route.params.itemID}` };
          // }}
        >
          {() => (
            <View>
              <Text>Logs</Text>
            </View>
          )}
        </RootStack.Screen>
      </RootStack.Navigator>
      {/* {() => {
        return (
          <View>
            <Text>Hello</Text>
          </View>
        );
      }} */}
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
