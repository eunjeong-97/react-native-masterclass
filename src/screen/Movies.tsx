import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
// expo-blur 패키지를 설치할때 만약 macOS에서 개발한다면 npx pod-install ios를 실행해야 한다
// 그리고 BlurView를 사용할때 ios에서 에러가 발생한다면 npm run-ios를 해서 ios 어플리케이션을 한번더 빌드해줘야한다

import { matkImgPath } from "../utils";

interface IMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = (prop) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovies[]>([]);

  useEffect(() => {
    const getNowPlaying = async () => {
      const { results } = await (await fetch(URL)).json();
      setNowPlayingMovies(results);
    };
    getNowPlaying();
    return () => console.log("useEffect return");
  }, []);

  return nowPlayingMovies.length === 0 ? (
    <Loading>
      <ActivityIndicator />
    </Loading>
  ) : (
    <Container>
      <Swiper loop timeout={2} controlsEnabled={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: matkImgPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
            {/*  absoluteFill이라는 constant를 가진다: 매우 자주쓰이는패턴으로써 오버레이를 만들기위한 어쩌구~~ */}
            <BlurView intensity={40} style={StyleSheet.absoluteFill}>
              {/* <BlurView intensity={40} style={{width:'100%', height:'100%',position:'absolute'}}> */}
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.ScrollView`
  /* 여기서 매번 배경색을 지정하는 것이 아니라 Tab Navigator에서 SceneContainerStyle에 지정 */
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* background-color: ${(props) => props.theme.mainBgColor}; */
`;

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default Movies;
