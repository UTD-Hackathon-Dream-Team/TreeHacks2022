import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        console.log("Permission granted");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
      <Button title="Create a Break" onPress={createEvent} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Break Time",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

async function getCalendar() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  console.log("Here are all your calendars:");
  console.log(calendars);
  for (const calendar of calendars) {
    // console.log(`Calendar with ID ${calendar.id} has name ${calendar.title}`);
    if (calendar.allowsModifications) {
      console.log(`Calendar with ID ${calendar.id} has name ${calendar.title}`);
      return calendar.id;
    }
    // if (calendar.title === "Break Time") {
    //   console.log(`Found calendar with ID ${calendar.id}`);
    //   return calendar.id;
    // }
  }
}

async function getEvents(calId) {
  const events = await Calendar.getEventsAsync(
    [calId],
    Date.now(),
    Date.now() + 1000 * 60 * 60 * 24
  );
  console.log(events);
}

async function createEvent() {
  const calId = await getCalendar();
  const caleve = await Calendar.createEventAsync(calId, {
    title: "Break Time",
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now() + 3600000),
    alarms: [{ relativeOffset: -5 }],
  });
  console.log(`Your new event ID is: ${caleve}`);
}
