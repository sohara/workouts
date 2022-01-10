import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { HomeScreen } from './Home';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Sessions: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen name="Sessions">
        {() => (
          <View>
            <Text>Messages Screen!</Text>
          </View>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
