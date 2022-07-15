import React from "react";
import styled from "styled-components/native";

import Poster from "./Poster";

interface IMovieProps {
  posterPath: string;
  title: string;
  voteAverage?: number;
  wrapperStyle?: any;
  direction?: "row" | "column";
  overview?: string;
  textWrapSize?: number;
  date?: string;
}

const Movie: React.FC<IMovieProps> = ({ posterPath, title, voteAverage, wrapperStyle, direction = "column", overview, textWrapSize = 40, date }) => {
  return (
    <Wrapper direction={direction} style={wrapperStyle}>
      <Poster path={posterPath} />
      <TextWrap style={direction === "row" ? { width: `${textWrapSize}%`, marginLeft: 15 } : { width: 100 }}>
        <Title>
          {title.slice(0, 13)}
          {title.length > 13 ? "..." : null}
        </Title>
        {voteAverage ? <Votes>{voteAverage > 0 ? `⭐ ${voteAverage}/10` : "Comming Soon..."}</Votes> : null}
        {overview ? <OverView>{overview?.slice(0, 50 + textWrapSize)}...</OverView> : null}
        {date ? <OverView>Comming: {new Date(date).toLocaleDateString("ko", { month: "long", day: "numeric", year: "numeric" })}</OverView> : null}
      </TextWrap>
    </Wrapper>
  );
};

interface IWrapper {
  direction?: "row" | "column";
}

const Wrapper = styled.View<IWrapper>`
  flex: 1;
  flex-direction: ${(props) => props.direction};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  overflow: hidden;
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
