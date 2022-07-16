import React from "react";
import styled from "styled-components/native";
import makeImgPath from '../utils/makeImgPath'

interface IPosterProp {
  path: string;
}

const Poster: React.FC<IPosterProp> = ({ path }) => <Image source={{ uri: makeImgPath(path) }} />;

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

export default Poster;
