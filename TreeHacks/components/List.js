import React from "react";
import { Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center } from "native-base";
import { Feather } from "@expo/vector-icons";

export default function List({mood}) {
  const instState = [{
    title: "Ate breakfast",
    isCompleted: false
  }, {
    title: "Ate lunch",
    isCompleted: false
  }, {
    title: "Ate dinner",
    isCompleted: false
  }, {
    title: "Took atleast a 15 minute break",
    isCompleted: false
  }, {
    title: "Brushed twice a day",
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