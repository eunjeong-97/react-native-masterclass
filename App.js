import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'

export default function App() {
  // NavigationContainer에 현재 다크모드여부를 확인해서 theme을 설정하면 편함
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
}

