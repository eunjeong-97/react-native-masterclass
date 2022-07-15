import React from "react";
import styled from "styled-components/native";

import Poster from "./Poster";

interface IMovieProps {
  posterPath: string;
  title: string;
  voteAverage: number;
  wrapperStyle?: any; // 스타일object
  direction?: "row" | "column";
  overview?: string;
}

const Movie: React.FC<IMovieProps> = ({ posterPath, title, voteAverage, wrapperStyle, direction = "column", overview }) => {
  return (
    <Wrapper style={wrapperStyle}>
      <Poster path={posterPath} />
      <TextWrap style={direction === "row" ? { width: "40%", marginLeft: 15 } : null}>
        <Title>
          {title.slice(0, 13)}
          {title.length > 13 ? "..." : null}
        </Title>
        <Votes>⭐ {voteAverage}/10</Votes>
        {overview ? <OverView>{overview?.slice(0, 90)}...</OverView> : null}
      </TextWrap>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const TextWrap = styled.View``;

const OverView = styled.Text`
  margin-top: 15px;
  color: ${(props) => props.theme.textColor};
`;

export default Movie;
