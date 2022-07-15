import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import { MOVIE_URL } from "../utils";

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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = (prop) => {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovies[]>([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getNowPlaying = async () => {
      const { results } = await (await fetch(MOVIE_URL(API_KEY, "now_playing"))).json();
      setNowPlayingMovies(results);
    };
    const getTrending = async () => {
      const { results } = await (await fetch(MOVIE_URL(API_KEY, "trending"))).json();
      setTrending(results);
    };

    const getUpcoming = async () => {
      const { results } = await (await fetch(MOVIE_URL(API_KEY, "upcoming"))).json();
      setUpcoming(results);
    };
    const getData = async () => {
      // 세가지 작업을 모두해야 setLoading(false)함
      await Promise.all([getNowPlaying(), getTrending(), getUpcoming()]);
      setLoading(false);
    };

    getData();
    return () => console.log("useEffect return");
  }, []);

  return loading ? (
    <Loading>
      <ActivityIndicator />
    </Loading>
  ) : (
    <Container>
      <Swiper horizontal loop autoplay autoplayTimeout={2} showsButtons={false} showsPagination={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
        {nowPlayingMovies.map((movie) => {
          return movie.vote_average > 0 ? <Slide key={movie.id} id={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} /> : null;
        })}
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

export default Movies;
