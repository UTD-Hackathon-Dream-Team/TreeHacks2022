import React from "react";
import { View, Image } from "react-native";
import Swiper from "react-native-swiper/src";
import { Box, Text, NativeBaseProvider} from "native-base";
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

var styles = {
  slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    textAlign: "center",
    fontWeight: "bold",
  },
};

function Login({ navigation }) {
  return (
    <Box style={{ flex: 1, backgroundColor: "#748EC1" }}>
      <Swiper showsButtons loop={false}>
        <Box style={styles.slides}>
          <SimpleLineIcons name="notebook" size={125} color="black" />
          <Text m="7" fontSize="4xl" style={styles.desc}>
            Working hard?
          </Text>
        </Box>
        <Box style={styles.slides}>
          <MaterialCommunityIcons name="bed-outline" size={135} color="black" />
          <Text m="7" fontSize="4xl" style={styles.desc}>
            Finding it hard to take breaks?
          </Text>
        </Box>
        <Box style={styles.slides}>
          <FontAwesome5 name="hands" size={135} color="black" />
          <Text m="7" fontSize="4xl" style={styles.desc}>
            We can help!
          </Text>
          {/* <TextInputs navigation={navigation} /> */}
        </Box>
      </Swiper>
    </Box>
  );
}

export default ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Login navigation={navigation} />
    </NativeBaseProvider>
  );
};
