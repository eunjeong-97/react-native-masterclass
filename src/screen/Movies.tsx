import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";

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
      <Swiper horizontal loop autoplay autoplayTimeout={2} showsButtons={false} showsPagination={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: matkImgPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
            <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark">
              <Wrapper>
                {/* uri: 우리의 파일시스템 안에 없는 이미지를 넣는 방법이다 웹에 있는 이미지 넣음*/}
                <Poster source={{ uri: matkImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <OverView>{movie.overview.slice(0, 90)}...</OverView>
                  {movie.vote_average > 0 ? <Votes>⭐ {movie.vote_average}/10</Votes> : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.ScrollView``;

const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  /* 이러한 속성대신 StyleSheet.absoluteFill constant를 사용해도 된다 */
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text`
  margin-top: 15px;
  color: ${(props) => props.theme.textColor};
`;

const Votes = styled(OverView)`
  margin-top: 5px;
`;

export default Movies;
