import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./views/LoginScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
                name="LogIn"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;