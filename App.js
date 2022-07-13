import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

/*
stack(더미) navigation: 새로운 screen이 이전 screen 위에 카드처럼 올라온다
stack와 tab을 골고루 잘 쓴다
tab이던 stack navigation이던 내가 만든 navigation을 렌더링하려면 
*/