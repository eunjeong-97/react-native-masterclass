import React from 'react';
import {ActivityIndicator} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

const Loader= () => {
    return (
        <Wrapper>
      <ActivityIndicator />
    </Wrapper>
    )
}

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Loader;