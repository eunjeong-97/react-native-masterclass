import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <View>
      <Text>Go to Two</Text>
    </View>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <View>
      <Text>Go to Three</Text>
    </View>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { goBack, setOptions } }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <TouchableOpacity onPress={() => goBack()}>
      <View>
        <Text>Go Back</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setOptions({ title: "Hello!" })}>
      <Button>
        <ButtonText selected={false}>Change Title</ButtonText>
      </Button>
    </TouchableOpacity>
  </View>
);

const NativeStack = createNativeStackNavigator();
const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

const Button = styled.View`
  background-color: #54a0ff;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
`;
const ButtonText = styled.Text`
  /* styled.js에서 어떤 속성이 잇는지 확인하면서 복붙하는 문제를 해결하기 위해 types를 declare(선언)하기만 하는 declaration파일을 생성한다 */
  color: ${(props) => props.theme.mainBgColor};
`;

export default Stack;
