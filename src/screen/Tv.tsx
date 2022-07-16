import React from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import SlideWrap from '../components/SlideWrap';
import { tvs } from '../utils/api';
const Tv = () => {
    const {isLoading:todayIsLoading,data:todayData,isRefetching:todayIsFetching} = useQuery(['tv', 'today'], tvs.airingToday);
    const {isLoading:topRatedIsLoading,data:topRatedData,isRefetching:topRatedIsFetching} = useQuery(['tv', 'topRated'], tvs.topRated);
    const {isLoading:trendingIsLoading,data:trendingData,isRefetching:trendingIsFetching} = useQuery(['tv', 'trending'], tvs.trending);

    const queryClient = useQueryClient();

    const loading = todayIsLoading || topRatedIsLoading || trendingIsLoading;
    const refershing = todayIsFetching || topRatedIsFetching || trendingIsFetching;
    // console.log(refershing); 처음에 렌더링될대는 false이고 새로고침되면 true가 되는지 항상 확인해보자
    const onRefresh = () => {
        queryClient.refetchQueries(['tv']);
    }

    return  loading ? <Loader /> : (
        <ScrollView contentContainerStyle={{paddingVertical:30}} refreshControl={<RefreshControl refreshing={refershing} onRefresh={onRefresh} />}>
            <SlideWrap title='today' data={todayData.results} />
            <SlideWrap title='top Rated' data={topRatedData.results} />
            <SlideWrap title='trending' data={trendingData.results} />
        </ScrollView>
    )
}
export default Tv;