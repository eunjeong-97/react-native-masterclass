import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../settings/color'

import Stack from './Stack';
import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <Tab.Navigator initialRouteName="Movies" screenOptions={{ tabBarStyle: { backgroundColor: isDark ? colors.DARK_GRAY : colors.WHITE }, tabBarActiveTintColor: colors.BURBPLE_LIGHT, tabBarLabelStyle: { fontSize: 13, fontWeight: '600', }, tabBarInactiveTintColor: isDark ? colors.WHITE_GRAY : '#778ca3', headerStyle: { backgroundColor: isDark ? colors.DARK_GRAY : colors.WHITE }, headerTitleStyle: { color: colors.BURBPLE_LIGHT } }}>
            <Tab.Screen name='Movies' component={Movies} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name='film' color={color} size={size} />
            }} />
            < Tab.Screen name='Tv' component={Tv} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name='tv' color={color} size={size} />
            }} />
            <Tab.Screen name='Search' component={Search} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name='search' color={color} size={size} />
            }} />
        </Tab.Navigator >
    )
}

export default Tabs;

// Tabs Navigator를 먼저 만들면서 스크린과 navigation을 설정하려면 screenOptions이나 (각각의 스크린에 다른 옵션을 주고 싶다면) options에 지정해주면 된다
// Tabs나 Stack Navigator에서 screenOptions이나 options이나 동일하게 작동된다
// Navigator에서 theme을 통해 다크모드를 설정할 수있다

// Stack Navigator에서 component로 준 스크린컴포넌트는 navigation props를 가진다
// navigate, setParameters, setOptions 등의 props을 가진다

// navigation.navigate()을 사용하면 다른 스크린으로 페이지이동이 가능한데
// 이렇게 NativeStack.Navigator가 일반 Stack Navigator와 다르다

// Stack Navigator는 Javascript을 통해 구현되서 커스터마이징이 편하지만
// 그렇기 때문에 Native Stack Navigator보다는 느릴 수 있다

// Native Stack Navigator는 Native APIs(iOS, android)를 사용하기 때문에 Native Stack Navigator를 사용할때는 내 디바이스가 사용하고 있는 플랫폼의 Native Navigator를 사용한다
// 그렇기 때문에 커스터마이징할 수 있는 가짓수가 적다

