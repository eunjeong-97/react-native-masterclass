import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";

import Slide from "../components/Slide";
import Movie from "../components/Movie";
import { IMovieResponse, movies } from "../utils/api";

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
  const queryClient = useQueryClient();
  const {isLoading: nowPlayingIsLoading, data:nowPlayingData, isRefetching:nowPlayingIsRefetching} = useQuery<IMovieResponse>(['movies', 'nowPlaying'], movies.nowplaying);
  const {isLoading: trendingIsLoading, data:trendingData, isRefetching:trendingIsRefetching} = useQuery<IMovieResponse>(['movies','trending'], movies.trending);
  const {isLoading: upcomingIsLoading, data:upcomingData, isRefetching:upcomingIsRefetching} = useQuery<IMovieResponse>(['movies','upcoming'], movies.upcoming);

  const loading = nowPlayingIsLoading ||trendingIsLoading ||upcomingIsLoading;
  const refreshing = nowPlayingIsRefetching ||trendingIsRefetching ||upcomingIsRefetching;

  const onRefresh = async()=>{
    queryClient.refetchQueries(['movies']);
  }

  if(nowPlayingData!==undefined) {
    // nowPlayingData.results의 속성key값 가져와서 interface만들 때 활용
    console.log(Object.keys(nowPlayingData.results[0]))
    // 각각의 속성value값들의 타입을 반환
    console.log(Object.values(nowPlayingData.results[0]).map(v=>typeof v))
  }

  // 이러한 item들은 FlatList에서 뽑아왔기 때문에 어떠한 type도 상속받지 못했다
  // keyExtractor={(item) => } 이런식으로 적어주면 되는데
  // 이게 type을 상속시켜주기 때문에 만약 길고 완전하게 완성하고 싶다면 이 기능을 다른곳에서 추출해오지 않으면 된다
  // FlatList에 movie array라고 데이터와 함께 type을 주는데 keyExtractor는 인자로 받은 item이 movieType인걸 알게 된다
  // 하지만 클린코드를 이루지 못하게 된다
  // const renderTrendingItem = ({ item }) => (
  //   <Movie
  //     posterPath={item.poster_path || ""}
  //     title={item.original_title}
  //     voteAverage={item.vote_average}
  //   />
  // );

  // const renderCommingItem = ({ item }) => (
  //   <Movie
  //     posterPath={item.poster_path || ""}
  //     title={item.original_title}
  //     direction="row"
  //     overview={item.overview}
  //     wrapperStyle={{ paddingHorizontal: 30 }}
  //     textWrapSize={60}
  //     date={item.release_date}
  //   />
  // );

  // const makeKeyExtractor = item => item.id + "";

  return loading ? (
    <Loading>
      <ActivityIndicator />
    </Loading>
  ) : (
    upcomingData ? 
    <FlatList
      data={upcomingData.results}
      keyExtractor={item => item.id + ""}
      ItemSeparatorComponent={VerticalSeperator}
      renderItem={({ item }) => (
        <Movie
          posterPath={item.poster_path || ""}
          title={item.original_title}
          direction="row"
          overview={item.overview}
          wrapperStyle={{ paddingHorizontal: 30 }}
          textWrapSize={60}
          date={item.release_date}
        />
      )}
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
            {nowPlayingData?.results.map(movie => {
              return movie.vote_average > 0 ? (
                <Slide
                  key={movie.id}
                  id={movie.id}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              ) : null;
            })}
          </Swiper>
          <ListWrap>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData? <FlatList
              horizontal
              data={trendingData.results}
              refreshing={refreshing}
              style={{ marginTop: 15 }}
              keyExtractor={item => item.id + ""}
              ItemSeparatorComponent={HorizontalSeperator}
              renderItem={({ item }) => (
                <Movie
                  posterPath={item.poster_path || ""}
                  title={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            />: null}
            
          </ListWrap>
          <ListWrap>
            <ListTitle>Comming Soon</ListTitle>
          </ListWrap>
        </>
      )}
    />
    : null
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

// react query를 사용할 때 typescript를 반영하는 방법
// API의 response type을 react query에 전달한다
// react query가 그러한 type을 받아서 hook의 데이터에 적용한다
