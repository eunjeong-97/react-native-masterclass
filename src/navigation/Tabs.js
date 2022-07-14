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
            {/* 1.Tab Navigator 안에 Stack Navigator를 포함시킴: Tab.Screen component={Stack}
            이렇게 되면 Stack과 Tab Navigation모두 Header가 포함되기 때문에 둘 중 하나의 Header를 보이지 않도록 설정하는데 보통 Tab Navigator의 Header를 표시하지 않는다 
            이 어플은 Tab Navigator 안에 있어서 다른 스크린으로 이동이 가능하다
            하지만 Movies Tab은 또 하나의 Navigator 안에 있고 현재 자신의 상태를 알아야 한다

            2. Tab와 Stack Navigator를 감싸는 Root Navigation을 만든다
            일반적으로 특정 스크린에서는 Tabs를 숨기고 싶기 때문에 특정 스크린에서 Tabs를 숨기는 방법
            즉, 특정스크린에서 Tabs를 덮는 방법 */}
            <Tab.Screen name='Movies' component={Movies} options={{
                headerShown: false,
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

