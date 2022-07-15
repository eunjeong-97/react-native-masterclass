import React from "react";
import styled from "styled-components/native";
import { StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";

import { makeImgPath } from "../utils";
import Poster from "./Poster";

interface ISlideProp {
  id: number;
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<ISlideProp> = ({ id, backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View key={id}>
      <BgImg source={{ uri: makeImgPath(backdropPath) }} style={StyleSheet.absoluteFill} />
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark">
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐ {voteAverage}/10</Votes> : null}
            <OverView>{overview.slice(0, 90)}...</OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? props.theme.textColor : props.theme.textColor)};
  font-size: 16px;
  font-weight: 600;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text`
  margin-top: 15px;
  color: ${(props) => props.theme.textColor};
`;

const Votes = styled(OverView)`
  margin-top: 5px;
`;

export default Slide;
