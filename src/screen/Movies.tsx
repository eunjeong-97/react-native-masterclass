import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";

import Loader from "../components/Loader";
import Slide from "../components/Slide";
import Movie from "../components/Movie";
import { IMovieResponse, movies } from "../utils/api";
import SlideWrap from "../components/SlideWrap";

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

// NativeStackScreenProps은 stack navigation의 screen일 때 사용
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const {isLoading: nowPlayingIsLoading, data:nowPlayingData, isRefetching:nowPlayingIsRefetching} = useQuery<IMovieResponse>(['movies', 'nowPlaying'], movies.nowPlaying);
  const {isLoading: trendingIsLoading, data:trendingData, isRefetching:trendingIsRefetching} = useQuery<IMovieResponse>(['movies','trending'], movies.trending);
  const {isLoading: upcomingIsLoading, data:upcomingData, isRefetching:upcomingIsRefetching} = useQuery<IMovieResponse>(['movies','upcoming'], movies.upcoming);

  const loading = nowPlayingIsLoading ||trendingIsLoading ||upcomingIsLoading;
  const refreshing = nowPlayingIsRefetching ||trendingIsRefetching ||upcomingIsRefetching;

  const onRefresh = async()=>{
    queryClient.refetchQueries(['movies']);
  }

  return loading ? (
    // <Loading>
    //   <ActivityIndicator />
    // </Loading>
    <Loader/>
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
            {/* <ListTitle>Trending Movies</ListTitle>
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
            /> */}
            {trendingData ? <SlideWrap title='Trending Movies' data={trendingData.results} /> : null }            
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

// const Loading = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

const ListWrap = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const VerticalSeperator = styled.View`
  height: 15px;
`;

export default Movies;