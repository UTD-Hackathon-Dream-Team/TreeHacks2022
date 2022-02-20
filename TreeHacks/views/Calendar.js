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
}

async function getCalendar() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  // console.log("Here are all your calendars:");
  // console.log(calendars);
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

async function getEvents() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  var cals = [];
  for (const calendar of calendars) {
    cals.push(calendar.id);
  }
  const events = await Calendar.getEventsAsync(
    cals,
    Date.now(),
    Date.now() + 1000 * 60 * 60 * 24
  );
  // console.log(events);
  const eventsWithTime = events.filter((event) => event.allDay === false);
  // console.log(eventsWithTime);
  return eventsWithTime;
}

async function createEvent() {
  const calId = await getCalendar();
  var events = await getEvents();
  var dateEvents = await events.map(function (event) {
    return {
      start: new Date(event.startDate),
      end: new Date(event.endDate),
    };
  });

  var requiredGap = 30 * 60 * 1000;
  var prev = dateEvents[0];
  var firstGap = null;

  for (var i = 1; i < dateEvents.length; i += 1) {
    var current = dateEvents[i];
    var diff = current.start - prev.end;

    if (diff >= requiredGap) {
      firstGap = {
        start: prev.end,
        end: current.start,
      };
      var startTime = new Date(prev.end);
      var endTime = new Date(startTime.getTime() + requiredGap);

      var caleve = await Calendar.createEventAsync(calId, {
        title: "Break Time",
        startDate: startTime,
        endDate: endTime,
        alarms: [{ relativeOffset: -5 }],
        notes: "self-care",
      });
      console.log(`Your new event ID is: ${caleve}`);
    }

    prev = current;
  }
}
