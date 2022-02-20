import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import LoginScreen from "./views/LoginScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
            <Stack.Navigator initialRouteName="LogIn">
              <Stack.Screen
                name="LogIn"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
