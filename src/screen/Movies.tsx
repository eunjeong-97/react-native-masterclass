import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, RefreshControl, FlatList, View } from "react-native";
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
    <FlatList
      data={upcoming}
      ListHeaderComponent={() => (
        <>
          <Swiper horizontal loop autoplay autoplayTimeout={2} showsButtons={false} showsPagination={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 25 }}>
            {nowPlayingMovies.map((movie) => {
              return movie.vote_average > 0 ? <Slide key={movie.id} id={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} /> : null;
            })}
          </Swiper>
          <ListWrap>
            <ListTitle>Trending Movies</ListTitle>
            <FlatList
              data={trending}
              style={{ marginTop: 15 }}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              renderItem={({ item }) => <Movie posterPath={item.poster_path} title={item.original_title} voteAverage={item.vote_average} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            />
          </ListWrap>
          <ListWrap>
            <ListTitle>Comming Soon</ListTitle>
          </ListWrap>
        </>
      )}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      renderItem={({ item }) => <Movie posterPath={item.poster_path} title={item.original_title} direction="row" overview={item.overview} wrapperStyle={{ paddingHorizontal: 30 }} textWrapSize={60} date={item.release_date} />}
      // refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
      refreshing={refresh}
      onRefresh={onRefresh}
    />
  );
};

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

export default Movies;

// 동일한 방향의 스크롤뷰가 있으면 안된다는 에러문구를 해결하기 위해
// Container에 썼던 ScrollView를 제거하고 FlatList로 사용할것이다
// 하지만 FlatList는 prop들의 묶음이기 때문에 자식요소를 가지지 않는다
// 그래서 우리는 FlatList를 만들어서 Swiper를 render하고 Horizontal FlatList와 Vertical FlatList를 render 해야 한다

// 그래서 이러한 문제를 해결하기 위해서 ListHeaderComponent prop를 사용하면 된다
// ListHeaderComponent는 컴포넌트들을 모든 아이템 위쪽으로 render해버린다

// 우선 세로로 만든 리스트들을 FlatList로 만든다
