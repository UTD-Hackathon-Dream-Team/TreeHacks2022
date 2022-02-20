import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import SettingsScreen from "../views/SettingsScreen";
import MoodScreen from "../views/MoodScreen";
import Calendar from "../views/Calendar";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
    >
      <BottomTab.Screen name="Home" component={MoodScreen} />
      <BottomTab.Screen name="Goals" component={SettingsScreen} />
      <BottomTab.Screen name="Calendar" component={Calendar} />
    </BottomTab.Navigator>
  );
}