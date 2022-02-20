import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import SettingsScreen from "../views/SettingsScreen";
import MoodScreen from "../views/MoodScreen";
import Calendar from "../views/Calendar";

import { Feather} from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
    >
      <BottomTab.Screen name="Home" component={MoodScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="black" />
          ) }} />
      <BottomTab.Screen name="Goals" component={SettingsScreen} 
        options={{
          tabBarLabel: 'Goals',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={24} color="black" />
          ) }} />
      <BottomTab.Screen name="Calendar" component={Calendar} 
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={24} color="black" />
          ) }} />
    </BottomTab.Navigator>
  );
}