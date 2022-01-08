import Amplify, { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import awsconfig from './src/aws-exports';
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

type RootStackParamList = {
  Home: undefined;
  Details: { itemID: number; otherParam: 'foo' | 'bar' };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
function HomeScreen({ navigation, route }: HomeScreenProps) {
  // console.warn({ route });
  // const state = useNavigationState((state) => state);
  // console.warn({ state });
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemID: 86,
            otherParam: 'foo',
          })
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
function Details({ navigation, route }: DetailsScreenProps) {
  const { itemID, otherParam } = route.params;
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text>itemID: {JSON.stringify(itemID)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.navigate('Details', {
            itemID: 86,
            otherParam: 'foo',
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        ></RootStack.Screen>
        <RootStack.Screen
          name="Details"
          component={Details}
          // options={({ route }) => ({ title: route.params.itemID })}
          options={(options) => {
            console.warn({ itemID: options.route.params.itemID });
            return { title: `item ${options.route.params.itemID}` };
          }}
        ></RootStack.Screen>
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
    justifyContent: 'center',
  },
});
