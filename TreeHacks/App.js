import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import LoginScreen from "./views/LoginScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Calendar from "./views/Calendar";

const Stack = createNativeStackNavigator();

console.disableYellowBox = true;

function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
                name="LogIn"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
      <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
              />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
