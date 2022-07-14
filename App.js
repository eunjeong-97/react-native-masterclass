import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Root from './src/navigation/Root';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Root />
    </NavigationContainer>
  );
}