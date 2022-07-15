import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { makeImgPath } from "../utils";
import Movie from "./Movie";

interface ISlideProp {
  id: number;
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<ISlideProp> = ({ id, backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
  return (
    <View key={id}>
      <BgImg source={{ uri: makeImgPath(backdropPath) }} style={StyleSheet.absoluteFill} />
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark">
        <Movie posterPath={posterPath} title={originalTitle} voteAverage={voteAverage} wrapperStyle={styles.movieWrap} direction="row" overview={overview} />
      </BlurView>
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const styles = StyleSheet.create({
  movieWrap: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Slide;
