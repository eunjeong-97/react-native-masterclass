import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";

interface IBox {
  bgColor: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const getNowPlaying = () => {
  fetch(URL);
};

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
  return (
    <Container>
      <Swiper loop timeout={3} controlsEnabled={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
        <Box bgColor="red"></Box>
        <Box bgColor="orange"></Box>
        <Box bgColor="green"></Box>
        <Box bgColor="blue"></Box>
        <Box bgColor="purple"></Box>
      </Swiper>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Box = styled.View<IBox>`
  background-color: ${(props) => props.bgColor};
  flex: 1;
`;

export default Movies;

// React Native Directory에서 구현하고 싶은 기능 검색해서 라이브러리 얻자
