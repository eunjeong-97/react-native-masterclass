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
import { useQuery, useQueryClient } from "react-query";

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
  // queryClient는 모든 cache를 관리한다
  // movies컴포넌트에서 cache된 쿼리에 접근하기 위해 useQueryClient 함수를 사용해서 queryClient를 정의했다
  // 이러한 queryClient 덕분에 다른 스크린들에 버튼을 만들 수도 있고 그 다른 스크린들이 또 다른 곳에 있는 다른 쿼리를 refetch할 수도 있다
  // 이게 가능한 이유는 모든 쿼리와 cache를 관리하는 queryClient를 사용했기 때문이다
  // useQuery hook에서 온 refetch를 사용해도 되지만 만약 다른 스크린의 쿼리를 refetch할 때에는 queryClient를 활용해서 client에 접속해서 내가 월하는 refetch를 명령해야 한다
  const queryClient = useQueryClient();
  const {isLoading: nowPlayingIsLoading, data:nowPlayingData, refetch:nowPlayingRefetch,isRefetching:nowPlayingIsRefetching} = useQuery(['movies', 'nowPlaying'], movies.nowplaying);
  const {isLoading: trendingIsLoading, data:trendingData, refetch:trendingRefetch,isRefetching:trendingIsRefetching} = useQuery(['movies','trending'], movies.trending);
  const {isLoading: upcomingIsLoading, data:upcomingData, refetch:upcomingRefetch,isRefetching:upcomingIsRefetching} = useQuery(['movies','upcoming'], movies.upcoming);
  const [refresh, setRefresh] = useState(false);

  const loading = nowPlayingIsLoading ||trendingIsLoading ||upcomingIsLoading;
  const refreshing = nowPlayingIsRefetching ||trendingIsRefetching ||upcomingIsRefetching;

  const onRefresh = async()=>{
    // query를 refetch한다
    // nowPlayingRefetch()
    // trendingRefetch()
    // upcomingRefetch()

    // movies키를 가진 쿼리들을 전부 refetch한다
    queryClient.refetchQueries(['movies'])
  }

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
      refreshing={refreshing}
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
              refreshing={refreshing}
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

// useQuery hook에서 얻을 수 있는 정보들 중에서 refetch가 있는데 쿼리를 다시 불러오는 역할을 한다
// isRefetching은 쿼리가 refetch되는지 확인하는데 필요한 boolean
// 이처럼 3개의 query를 refetch하는 방법도 있지만 QueryClient를 통해 cache에 접근하는 방법도 있다
// QueryClient는 모든 쿼리들을 통제할 수 있기 때문에 쿼리를 삭제할 수도 있고 취소할 수도 있고 refetch할 수도 있다
// 또한 부분적으로 queryKey에 맞는 쿼리만 refetch하는 옵션도 있다

// queryKey는 string도 될 수 있고 array도 될 수도 있다
// 이것들을 통해 key들에게 category를 만들어주거나 queryKey에 변수를 추가할 수도 있다
// useQuery() hook에서 refetch를 import하지 않고 queryKey를 카테고리화(=범주화)를 하면 기존의 queryKey "nowPlaying" → ["movies", "nowPlaying"] 이라고 적어서 "nowPlaying" 쿼리를 movies 카테고리에 넣을 수 있다
