import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import Movie from "../components/Movie";

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
const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovies[]>([]);
  const [upcoming, setUpcoming] = useState<IMovies[]>([]);
  const [trending, setTrending] = useState<IMovies[]>([]);

  const getNowPlaying = async () => {
    const { results } = await (await fetch(NOW_PLAYING_URL)).json();
    setNowPlayingMovies(results);
  };
  const getTrending = async () => {
    const { results } = await (await fetch(TRENDING_URL)).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (await fetch(UPCOMING_URL)).json();
    setUpcoming(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getTrending(), getUpcoming()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    return () => console.log("useEffect return");
  }, []);

  const onRefresh = async () => {
    // setRefreshing에 true를 전달하고
    // getDate를 기다릴거다
    setRefresh(true);
    await getData();
    setRefresh(false);
  };

  return loading ? (
    <Loading>
      <ActivityIndicator />
    </Loading>
  ) : (
    <Container refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
      <Swiper horizontal loop autoplay autoplayTimeout={2} showsButtons={false} showsPagination={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 25 }}>
        {nowPlayingMovies.map((movie) => {
          return movie.vote_average > 0 ? <Slide key={movie.id} id={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} /> : null;
        })}
      </Swiper>
      <ListWrap>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 30 }}>
          {trending.map((movie) => (
            <Movie key={movie.id} posterPath={movie.poster_path} title={movie.original_title} voteAverage={movie.vote_average} wrapperStyle={{ marginLeft: 10 }} />
          ))}
        </TrendingScroll>
      </ListWrap>
      <ListWrap>
        <ListTitle>Comming Soon</ListTitle>
        {upcoming.map((movie) => (
          <Movie key={movie.id} posterPath={movie.poster_path} title={movie.original_title} direction="row" overview={movie.overview} wrapperStyle={{ paddingHorizontal: 30, paddingTop: 15 }} textWrapSize={60} date={movie.release_date} />
        ))}
      </ListWrap>
    </Container>
  );
};

const Container = styled.ScrollView``;

const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ListWrap = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

export default Movies;

// ScrollView는 refreshControl 이라는 prop을 가지고 있어서 RefreshControl 컴포넌트를 넘겨줘야한다
// RefreshControl 컴포넌트는 refreshing이라는 boolean값으로 새로고침 중인지의 여부를 의미한다
// onRefresh는 유저가 새로고침을 했을대 어떤일이 일어나게 할건지 설정한다
