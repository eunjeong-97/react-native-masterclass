import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
}

// stack navigation: 기본적으로 새 screen이 이전의 screen 위로 올라오는 것이다
// 그래서 이전 screen으로 돌아갈 수도 있고 카드처럼 보인다
// stack navigator는 react navigation에 있음,  iOS나 안드로이드의 navigation사용안하고 자바스크립트의 navigation을 사용
// 그래서 iOS나 안드로이드같은 네이티브로 구현된것보다 성능이 좋지는 않다

// native stack navigator는 native API를 이용해서 구현됨
// iOS의 UINavigationController와 안드로이드의 Fragment를 사용하기 때문에 커스텀할 수잇는 영역이 좀 줄어들게 된다
// createNativeStackNavigator를 사용해서 navigator를 만들면 native로 만든 일반적인 어플리케이션과 완전히 동일한 방식으로 작동되고 퍼포먼스도 동일하다
// 속도를 중시하기 위해 Native Stack Navigator를 사용할 거라 @react-navigation/native-stack 패키지를 설치한다