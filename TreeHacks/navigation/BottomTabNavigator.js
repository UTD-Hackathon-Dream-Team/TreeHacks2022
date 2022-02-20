import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import SettingsScreen from "../views/SettingsScreen";
import MoodScreen from "../views/MoodScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
    >
      <BottomTab.Screen name="Home" component={MoodScreen} />
      <BottomTab.Screen name="Profile" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}