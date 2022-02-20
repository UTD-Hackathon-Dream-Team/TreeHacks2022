import React, { useEffect, useState } from "react";
import { View, Text, Button, Platform, ScrollView, RefreshControl } from "react-native";
import { VStack, Center, Spinner } from 'native-base';
import * as Calendar from "expo-calendar";
import { StackedBarChart } from "react-native-chart-kit";
const axios = require('axios').default;

export default function App() {
  const [events, setEvents] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await getData();
    setRefreshing(false)
  }, []);

  const getData = async() => {
    const events = await getEvents();
      await Promise.all(events.map(async (event) => {
        /*const prediction = await axios.post("https://api.mage.ai/v1/predict", {
          "api_key": "onff4N4CpmB9NHCl4t7SNYZxSpyH0mJDC9dZHNc0",
          "features": [
            {
              "date_": event.endDate,
              "day_": parseISOString(event.endDate).getDay() || 7,
              "summary": event.notes
            }
          ],
          "model": "custom_prediction_classification_1645334932490",
          "version": "1"
        });
        event.type = prediction.data.prediction;
        console.log(prediction.data.prediction);*/
      }));
    setEvents(events);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      await getData();
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
      {events === null && <Spinner accessibilityLabel="Fetching calendar" />}
      {events !== null && 
      <VStack space={4} alignItems="center">
        <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
          You have {events.length} event(s) this week
        </Center>
        <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
          They take up a total of {events.reduce((partial, curr) =>
            partial+Math.abs(parseISOString(curr.endDate) - parseISOString(curr.startDate))/36e5, 0)} hours
        </Center>
        <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
          <Button title="Create a Break" onPress={createEvent} />
        </Center>
    </VStack>}
    <StackedBarChart
      data={data}
      width={380}
      height={280}
      chartConfig={{
        backgroundGradientFrom: "#a8b4fc",
        backgroundGradientTo: "#a8b4fc",
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 0.6
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
        marginTop: 20
      }}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      showLegend={false}
    />
    </ScrollView>
    </View>
  );
}

const data = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 160],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [10, 10, 0]
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

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
  //console.log(`Your new calendar ID is: ${newCalendarID}`);
}

async function getCalendar() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  //console.log("Here are all your calendars:");
  //console.log(calendars);
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
  const eventsWithTime = events.filter((event) => event.allDay === false);
  return eventsWithTime;
}

async function createEvent() {
  const calId = await getCalendar();
  await getEvents();
  const caleve = await Calendar.createEventAsync(calId, {
    title: "Break Time",
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now() + 3600000),
    alarms: [{ relativeOffset: -5 }],
    notes: "Break time"
  });
  //console.log(`Your new event ID is: ${caleve}`);
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}