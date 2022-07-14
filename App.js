import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import Root from './src/navigation/Root';
import { darkTheme, lightTheme } from './src/settings/styled';

export default function App() {
  // 중요한 색상은 darkTheme과 lightTheme에 포함되어있기 때문에
  // ThemeProvider에서 한번만 useColorScheme() hook을 사용해도 된다
  const isDark = useColorScheme() === 'dark';
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}