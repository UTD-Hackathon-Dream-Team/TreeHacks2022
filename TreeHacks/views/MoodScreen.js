import React, { useState } from "react";
import { Heading, Flex, Center, Button, HStack } from "native-base";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import List from "../components/List";

export default function MoodScreen(props) {
    const [mood, setMood] = useState("null");

    const getColor = (type) => {
      switch(type) {
        case "E": return "#90e089";
        case "R": return "#db88da";
        case "U": return "#858dd6";
        case "D": return "#85c6d4";
        default: return "#c6cbcc";
      }
    }

    const WeekView = () => {
      return <View>
        <Heading style={{marginVertical: 10, textAlign: "center"}}><Text>This Weeks Moods</Text></Heading>
        <HStack space={3} justifyContent="center">
        <Center h="20" w="10" bg={getColor("E")} rounded="md" shadow={2}>Mon</Center>
        <Center h="20" w="10" bg={getColor("D")} rounded="md" shadow={2}>Tue</Center>
        <Center h="20" w="10" bg={getColor("U")} rounded="md" shadow={2}>Wed</Center>
        <Center h="20" w="10" bg={getColor("D")} rounded="md" shadow={2}>Thu</Center>
        <Center h="20" w="10" bg={getColor("E")} rounded="md" shadow={2}>Fri</Center>
        <Center h="20" w="10" bg={getColor("R")} rounded="md" shadow={2}>Sat</Center>
        <Center h="20" w="10" bg={getColor(mood.charAt(0).toLocaleUpperCase())} rounded="md" shadow={2}>Sun</Center>
      </HStack></View>;
    }

    const PickMood = () => {
      return <View><Heading style={{marginVertical: 10, textAlign: "center"}}><Text>Today I'm Feeling...</Text></Heading>
      <Flex direction="row" wrap="wrap" justify="center">
      <Button style={styles.button} w="40" h="20" bg={getColor("E")} onPress={() => setMood("energized")}
      leftIcon={<FontAwesome5 name="running" color="black" size={30} />} isDisabled={mood !== "null" && mood !== "energized"}>
        Energized
      </Button>
      <Button style={styles.button} w="40" h="20" bg={getColor("R")} onPress={() => setMood("reflective")}
      leftIcon={<FontAwesome5 name="brain" size={30} color="black" />} isDisabled={mood !== "null" && mood !== "reflective"}>
        Reflective
      </Button>
      <Button style={styles.button} w="40" h="20" bg={getColor("U")} onPress={() => setMood("unhappy")}
      leftIcon={<FontAwesome5 name="sad-tear" size={30} color="black" />} isDisabled={mood !== "null" && mood !== "unhappy"}>
        Unhappy
      </Button>
      <Button style={styles.button} w="40" h="20" bg={getColor("D")} onPress={() => setMood("drained")}
      leftIcon={<FontAwesome5 name="bed" size={30} color="black" />} isDisabled={mood !== "null" && mood !== "drained"}>
        Drained
      </Button>
    </Flex></View>;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ScrollView>
            {mood !== "null" && <View><Heading style={{marginVertical: 10, textAlign: "center"}}>
              <Text>Tasks To Do</Text></Heading><List mood={mood}/></View>}
            <PickMood/>
            <WeekView/>
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});