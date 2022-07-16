import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import Movie from './Movie';
import { IMovie, ITV } from '../utils/api';

interface ISlideWrap {
    title:string;
    data: IMovie[] | ITV[];
}

const SlideWrap:React.FC<ISlideWrap>= ({data, title}) => {
    return (
<>
<Title>{title}</Title>
<FlatList data={data} 
            horizontal
            contentContainerStyle={{paddingHorizontal:30}}
            ItemSeparatorComponent={HorizontalSeperator}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: IMovie |ITV)=>item.id+""}
            renderItem={({item }: {item: IMovie |ITV})=><Movie posterPath={item.poster_path || ""} 
            // title={item.original_name ? item.original_name : item.original_title} 
            // original_name을 가지고 있다면 original_name을 전달하고, 없으면 original_title 전달
            title={item.original_name ?? item.original_title} 
            direction='row' voteAverage={item.vote_average} />} />
</>
    )
}

const Title = styled.Text`
    font-size:16px;
    font-weight:600;
    color: ${props=>props.theme.textColor};
    margin-left:30px;
    margin-bottom:30px;
`

const HorizontalSeperator = styled.View`
  width: 15px;
`;

export default SlideWrap;