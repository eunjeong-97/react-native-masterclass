import React, { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  FlatList,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { useQuery } from "react-query";

import Slide from "../components/Slide";
import Movie from "../components/Movie";
import { movies } from "../utils/api";

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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const {isLoading: nowPlayingIsLoading, data:nowPlayingData} = useQuery('nowPlaying', movies.nowplaying);
  const {isLoading: trendingIsLoading, data:trendingData} = useQuery('trending', movies.trending);
  const {isLoading: upcomingIsLoading, data:upcomingData} = useQuery('upcoming', movies.upcoming);
  const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovies[]>([]);
  // const [upcoming, setUpcoming] = useState<IMovies[]>([]);
  // const [trending, setTrending] = useState<IMovies[]>([]);

  // const getNowPlaying = async () => {
  //   const { results } = await (await fetch(NOW_PLAYING_URL)).json();
  //   setNowPlayingMovies(results);
  // };
  // const getTrending = async () => {
  //   const { results } = await (await fetch(TRENDING_URL)).json();
  //   setTrending(results);
  // };

  // const getUpcoming = async () => {
  //   const { results } = await (await fetch(UPCOMING_URL)).json();
  //   setUpcoming(results);
  // };
  // const getData = async () => {
  //   await Promise.all([getNowPlaying(), getTrending(), getUpcoming()]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getData();
  //   return () => console.log("useEffect return");
  // }, []);

  // const onRefresh = async () => {
  //   setRefresh(true);
  //   await getData();
  //   setRefresh(false);
  // };

  const loading = nowPlayingIsLoading ||trendingIsLoading ||upcomingIsLoading;
  const onRefresh = async()=>""

  const renderTrendingItem = ({ item }) => (
    <Movie
      posterPath={item.poster_path}
      title={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderCommingItem = ({ item }) => (
    <Movie
      posterPath={item.poster_path}
      title={item.original_title}
      direction="row"
      overview={item.overview}
      wrapperStyle={{ paddingHorizontal: 30 }}
      textWrapSize={60}
      date={item.release_date}
    />
  );

  const makeKeyExtractor = item => item.id + "";

  return loading ? (
    <Loading>
      <ActivityIndicator />
    </Loading>
  ) : (
    <FlatList
      data={upcomingData.results}
      keyExtractor={makeKeyExtractor}
      ItemSeparatorComponent={VerticalSeperator}
      renderItem={renderCommingItem}
      refreshing={refresh}
      onRefresh={onRefresh}
      ListHeaderComponent={() => (
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 25,
            }}
          >
            {nowPlayingData.results.map(movie => {
              return movie.vote_average > 0 ? (
                <Slide
                  key={movie.id}
                  id={movie.id}
                  backdropPath={movie.backdrop_path}
                  posterPath={movie.poster_path}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              ) : null;
            })}
          </Swiper>
          <ListWrap>
            <ListTitle>Trending Movies</ListTitle>
            <FlatList
              horizontal
              data={trendingData.results}
              style={{ marginTop: 15 }}
              keyExtractor={makeKeyExtractor}
              ItemSeparatorComponent={HorizontalSeperator}
              renderItem={renderTrendingItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            />
          </ListWrap>
          <ListWrap>
            <ListTitle>Comming Soon</ListTitle>
          </ListWrap>
        </>
      )}
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
  color: ${props => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const HorizontalSeperator = styled.View`
  width: 15px;
`;

const VerticalSeperator = styled.View`
  height: 15px;
`;

export default Movies;

// GraphQL을 사용해서 react개발을 하게 되면 Apollo도 아름답고 fetch같은것도 안해줘도 됨
// 만약 restAPI를 가지고 있으면 보통은 redux을 사용하지만 react query를 사용해도 좋다
// react query hook을 통해서 fetch데이터에 접근할 수 있도록 해주면서 fetch데이터와 함께 loading state도 알려준다

// react-query를 설치하고 queryClient를 만들어서 QueryClientProvider로 application을 감싸면 된다
// useQuery hook의 두번째인자에 fetcher(fetch operation)를 사용한다
// 즉, fetch를 직접 사용하는것이 아니라 fetch를 useQuery hook의 인자로 사용한다
// useQuery hook은 fetch가 뭘 하던 추적해서 우리에게 data와 error가 있는지, 그리고 로딩중인지를 넘겨준다

// react query는 이 데이터가 한번 fetch가 되면 다시는 fetch를 하지 않는 caching을 사용하기 때문에 
// 이전처럼 movies화면이 마운트될때마다 데이터를 fetch하지 않아도 된다
// 물론 react native는 화면을 이동할 때 unmount되는게 아니지만 컴포넌트를 떠날때 그 컴포넌트를 unmount를 해주면 데이터 메모리를 줄여줄 수 있다 <Tab.Navigator screenOptions={{unmountOnBlur:true}} />을 해주면 된다
// state는 해당 컴포넌트가 마운트되었을때만 존재하는데 이런 현상을 막고 data가 chched되길 원한다면 redux나 apollo를 통해 직접 데이터캐싱작업을 해야한다
// 이처럼 직접 데이터 캐싱작업을 하면 어렵지만 react query를 사용하면 언마운트되었다가 돌아와도 data는 유지된다
// 어쨌던 이러한 캐싱기능을 위해 useQuery를 사용할때 queryKey를 정해준다
// 이러한 queryKey를 통해 캐싱된 데이터에 접근을 하거나 변형을 할 수 있는데 이 캐시가 어떤 타입의 데이터인지 알아야 한다
// 만약 다른컴포넌트에서 동일한 쿼리를 사용했을경우 다시 fetch하지 않는다
