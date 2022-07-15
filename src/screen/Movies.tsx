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
    <Container refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
      <Swiper horizontal loop autoplay autoplayTimeout={2} showsButtons={false} showsPagination={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 25 }}>
        {nowPlayingMovies.map((movie) => {
          return movie.vote_average > 0 ? <Slide key={movie.id} id={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} /> : null;
        })}
      </Swiper>
      <ListWrap>
        <ListTitle>Trending Movies</ListTitle>
        {/* <TrendingScroll horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 30 }}>
          {trending.map((movie) => (
            <Movie key={movie.id} posterPath={movie.poster_path} title={movie.original_title} voteAverage={movie.vote_average} wrapperStyle={{ marginLeft: 10 }} />
          ))}
        </TrendingScroll> */}
        {/*renderItem에서 item은 배열 형태의 data에서 각각의 요소를 가리킨다
          VirtualizedList는 같은 방향의 ScrollView 안에 감싸져있으면 안된다
          즉 수직방향의 FlatList를 수직방향의 ScrollView 안에 넣을 수 없다는 뜻이다 
          그리고 모든 속성을 받기 때문에 ScrollView에서 사용하던 prop을 사용할수도 잇다
        */}
        <FlatList
          data={trending}
          style={{ marginTop: 15 }}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          renderItem={({ item }) => (
            <Movie
              posterPath={item.poster_path}
              title={item.original_title}
              voteAverage={item.vote_average}
              //  wrapperStyle={{ marginLeft: 10 }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
        />
      </ListWrap>
      <ListWrap>
        <ListTitle>Comming Soon</ListTitle>
        {/* {upcoming.map((movie) => (
          <Movie key={movie.id} posterPath={movie.poster_path} title={movie.original_title} direction="row" overview={movie.overview} wrapperStyle={{ paddingHorizontal: 30, paddingTop: 15 }} textWrapSize={60} date={movie.release_date} />
        ))} */}
        {/*
        지금은 Movie컴포넌트 자체에서 marginTop:15를 주긴 했지만 Movie 컴포넌트 자체가 간격을 가지는 것이 아니라 리스트로 존재할때 간격이 15가 필요한 것이기 때문에 Movie에 간격을 지정하는것이 아니라 FlatList에서 item 사이에는 간격 15px을 render해야한다는걸 알아야 한다
      
        ScrollView는 이렇게 지정하는 것이 없기 때문에 margin을 통해 수동으로 각각의 컴포넌트를 밀어줬지만 
        FlatList에서는 우리가 seperator를 render할 수 잇게 해줫다
        ✨ 컴포넌트를 만들어서 style을 입힐때에는 어떤 속성이 정말 이 컴포넌트에 필요한지 어떤 속성이 외부 레이아웃에 필요한건지 구분해야 한다

        따라서 FlatList에서 seperator를 render하도록 만든 속성이 ItemSeparatorComponent이다 
        ItemSeparatorComponent는 item 사이사이에 컴포넌트들을 render해준다
        그리고 FlatList에서 맨 끝에 존재하는요소에는 ItemSeparatorComponent를 넣지 않는다
        */}
        <FlatList
          data={upcoming}
          /* 숫자타입의 virtualizedCell.cellkey는 안된다는 에러가 발생하는 이유는
          ReactJS에서 map으로 여러 요소를 render하면 key가 있어야 하는데 FlatList에서는 어떤걸 key로 할지 지정을 못하기 때문이다
          그래서 각각의 renderItem에 어떤 key를 넣어줘야하는지 FlatList에게 알려주는 속성으로     keyExtractor에 함수를 전달하면 된다 
          이 함수는 리스트의 item을 받아와서 item의 어떤부분을 key로 삼을건지 반환해주면된다
          */
          keyExtractor={(item) => item.id + ""}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          renderItem={({ item }) => (
            <Movie
              posterPath={item.poster_path}
              title={item.original_title}
              direction="row"
              overview={item.overview}
              wrapperStyle={{ paddingHorizontal: 30 }}
              textWrapSize={60}
              date={item.release_date}
              // wrapperStyle={{ paddingHorizontal: 30, paddingTop:15 }}
            />
          )}
        />
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

// const TrendingScroll = styled.FlatList`
//   margin-top: 15px;
// `;

export default Movies;
