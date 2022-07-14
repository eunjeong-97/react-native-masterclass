import React from "react";

// NativeStackScreenProps 은 Native Stack Navigator에서 온 스크린에게 전달한다
// 그래서 만약에 Movies 컴포넌트를 Type지정해주려면 NativeStackScreenProps을 import해야와 한다
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
// NativeStackScreenProps은 props를 지정할 때 사용하는데
// RootStackParamList: 스크란사이에서 커뮤니케이션을 하고 싶을경우 Navigation Parameters를 사용할 때 자세히 기재하고 지금은 any라고만 적음
// 두번째로는 스크린이름을 적는다

// navigation이나 navigate는 완전히 타입지정이 되었기 때문에 navigation.navigate() 이라고 수정한다
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Stack", { screen: "Three" })}>
        <Text>Movies</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
