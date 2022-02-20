import React, {useState} from "react";
import { Heading, Flex, Center, Button, HStack, Box } from "native-base";
import { View, Text } from "react-native";
import List from "../components/List";

export default function SettingsScreen(props) {
  const[submit, setSubmit] = useState(false);

  const WeekView = () => {
      return <View>
        <Heading style={{marginVertical: 10, textAlign: "center"}}><Text>This Weeks Streaks</Text></Heading>
        <HStack space={3} justifyContent="center">
        <Center h="20" w="10" bg="#6ceb8e" rounded="md" shadow={2}>Mon</Center>
        <Center h="20" w="10" bg="#ed6878" rounded="md" shadow={2}>Tue</Center>
        <Center h="20" w="10" bg="#6ceb8e" rounded="md" shadow={2}>Wed</Center>
        <Center h="20" w="10" bg="#6ceb8e" rounded="md" shadow={2}>Thu</Center>
        <Center h="20" w="10" bg="#6ceb8e" rounded="md" shadow={2}>Fri</Center>
        <Center h="20" w="10" bg="#ed6878" rounded="md" shadow={2}>Sat</Center>
        <Center h="20" w="10" bg={submit?"#6ceb8e":"#c6cbcc"} rounded="md" shadow={2}>Sun</Center>
      </HStack></View>;
  };

    return (
      <Box style={{ flex: 1, backgroundColor: "#abbbd9" }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Heading style={{marginVertical: 10, textAlign: "center"}}>
          <Text>Tasks To Do</Text></Heading><List mood="energetic"/>
          <Button style={{margin: 10}} onPress={() => setSubmit(true)}>Submit</Button>
          <WeekView/>
          <Heading style={{marginVertical: 10, textAlign: "center"}}>
              <Text>Weekly Trends</Text></Heading>
              <Center style={{paddingHorizontal: 15}}>
                <Text style={{textAlign: "center", marginBottom: 5}}>You typically miss your goals on Tuesday as you have a lot of meetings. Try and reschedule some for other days!</Text>
                <Text style={{textAlign: "center"}}>You surpassed your goals every Sunday! Keep it up!</Text>
              </Center>
        </View>
      </Box>
      );
}