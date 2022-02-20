import React from "react";
import { Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

export default function List({mood}) {
    let t1, t2, t3, t4;
    if(mood === "energized") {
        t1 = "Take a 15 minute walk";
        t2 = "Explore a new place";
        t3 = "Go to the gym";
        t4 = "Go to a dance class";
    } else if(mood === "reflective") {
        t1 = "Meditate for 15 minutes";
        t2 = "Call someone you've been meaning to";
        t3 = "Write in a journal";
        t4 = "Read about something new";
    } else if(mood === "unhappy") {
        t1 = "Meet with a friend";
        t2 = "Treat yourself to a nice meal";
        t3 = "Write some affirmations";
        t4 = "Take a nature walk";
    } else {
        t1 = "Get a extra 30 minutes of sleep";
        t2 = "Take some time to yourself";
        t3 = "Treat yourself to a nice snack";
        t4 = "Go for a spa trip";
    }
  const instState = [{
    title: t1,
    isCompleted: false
  }, {
    title: t2,
    isCompleted: false
  }, {
    title: t3,
    isCompleted: false
  }, {
    title: t4,
    isCompleted: false
  }];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");

  const addItem = title => {
    setList([...list, {
      title: title,
      isCompleted: false
    }]);
  };

  const handleStatusChange = index => {
    const temp = list.map((item, itemI) => itemI !== index ? item : { ...item,
      isCompleted: !item.isCompleted
    });
    setList(temp);
  };

  return <Center w="100%">
      <Box maxW="300" w="100%">
        <VStack space={4}>
          <HStack space={2}>
            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
            <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
            addItem(inputValue);
            setInputValue("");
          }} />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title}>
                  <Text mx="2" strikeThrough={item.isCompleted} _light={{
                color: item.isCompleted ? "gray.400" : "coolGray.800"
              }} _dark={{
                color: item.isCompleted ? "gray.400" : "coolGray.50"
              }}>
                    {item.title}
                  </Text>
                </Checkbox>
              </HStack>)}
          </VStack>
        </VStack>
      </Box>
    </Center>;
};