import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import { VStack, Center, Spinner, Box } from "native-base";
import * as Calendar from "expo-calendar";
import { StackedBarChart } from "react-native-chart-kit";
const axios = require("axios").default;

export default function App() {
  const [events, setEvents] = useState(null);
  const [hours, setHours] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  const data = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    legend: ["Work", "Fun", "Self-Care"],
    data: hours,
    barColors: ["#77a5d4", "#cfab82", "#d487c2"]
  };

  const getData = async () => {
    const fetchEvents = await getEvents();
      await Promise.all(fetchEvents.map(async (event) => {
        if(event.notes === "self-care") event.type = "s";
        else if(event.notes === "w") event.type = "w";
        else if(event.notes === "f") event.type = "f";
        else {
          const prediction = await axios.post("https://api.mage.ai/v1/predict", 
          {
            "api_key": "sR899rHqcf6wl0QUrraXeHhTP9XvHYlv01zgcpd5",
            "features": [
              {
                "date_": event.startDate,
                "day_": getDayofWeek(parseISOString(event.startDate).getDay()),
                "end_": event.endDate,
                "location_": event.location,
                "summary": event.title
              }
            ],
            "model": "custom_prediction_classification_1645346969337",
            "version": "1"
          });
          event.type = prediction.data[0].prediction;
        }
      }));
    setEvents(fetchEvents);
    let weeklyHours = Array(7)
      .fill()
      .map((entry) => Array(3).fill(0));
    for (const event of fetchEvents) {
      let typeNumb;
      switch(event.type) {
        case "w":
          typeNumb = 0;
          break;
        case "f":
          typeNumb = 1;
          break;
        default: // case self-care
          typeNumb = 2;
          break;
      }
      weeklyHours[parseISOString(event.endDate).getDay()][typeNumb] =
        Math.abs(
          parseISOString(event.endDate) - parseISOString(event.startDate)
        ) / 36e5;
    }
    setHours(weeklyHours);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      await getData();
    })();
  }, []);

  return (
    <Box style={{ flex: 1, backgroundColor: "#abbbd9" }}>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
          {events === null && <Spinner accessibilityLabel="Fetching calendar" />}
          {events !== null && (
            <VStack space={4} alignItems="center">
              <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
                You have {events.length} event(s) this week
              </Center>
              <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
                They take up a total of
                {events.reduce(
                  (partial, curr) =>
                    partial +
                    Math.abs(
                      parseISOString(curr.endDate) -
                        parseISOString(curr.startDate)
                    ) /
                      36e5,
                  0
                )}
                hours
              </Center>
              <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3}>
                <Button title="Create Today's Break" onPress={createEvent} />
              </Center>
              <StackedBarChart
                data={data}
                width={380}
                height={280}
                chartConfig={{
                  backgroundGradientFrom: "#a8b4fc",
                  backgroundGradientTo: "#a8b4fc",
                  color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                  barPercentage: 0.6,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginTop: 20,
                }}
                withHorizontalLabels={false}
                showLegend={false}
              />
            </VStack>
          )}
        </ScrollView>
      </View>
    </Box>
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
    note: "self-care"
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

async function getEvents(justToday = false) {
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
    Date.now() + 1000 * 60 * 60 * 24 * (justToday?1:7)
  );
  const eventsWithTime = events.filter((event) => event.allDay === false);
  // console.log(eventsWithTime);
  return eventsWithTime;
}

async function createEvent() {
  const calId = await getCalendar();
  var events = await getEvents(true);
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
  //console.log(`Your new event ID is: ${caleve}`);
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function getDayofWeek(num) {
  switch (num) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
}
