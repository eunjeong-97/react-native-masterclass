import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Stack from './src/navigation/Stack';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack />
    </NavigationContainer>
  );
}