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

// ScrollView는 어플리케이션의 퍼포먼스에 좋지 않아서 어플을 느리게 할 수도 있다
// 왜냐하면 스크롤뷰는 모든 자식 컴포넌트를 한번에 render하기 때문이다
// 즉 어플을 새로고침햇을때 ScrollView의 첫번째 자식컴포넌트도 렌더되는 건 당연하고 스크롤하지 않아서 아직 보이지 않을 마지막 요소까지 렌더가 된다
// 그래서 엄청 많은 데이터를 보여주고 싶을때에는 스크롤뷰를 사용하면 안된다는 거다
// 유저들은 항상 맨 끝까지 스크롤하지 않기 때문에 굳이 한번에 모든 걸 render할 필요가 없다

// 이러한 문제를 해결하기 위해 FlatList 컴포넌트가 나왓는데, 자식요소들을 게으르게 render한다
// 즉 컴포넌트가 화면에 나타나기 직전에야 컴포넌트를 render한다는 뜻이다
// 이러한 현상을 lazy render라고 하는데 모든 걸 한번에 render하지 않고 화면에 나타나기 직전에 한다
// 그래서 아주 빠르고 퍼포먼스가 좋아지게 된다

// 또한 FlatList에서는 ScrollView처럼 map을 하지 않아도 된다
// FlatList는 리스트를 렌더링하기 위한 performance interface이다

// 추가로, SectionList는 종종 어플리케이션을 만들 때 필요할만한걸 가지고 있다

// 정리: 왜 FlatList를 사용하는가?
// 아주 많은 양의 데이터를 render할 때 좋은 퍼포먼스를 내기위해 사용한다
