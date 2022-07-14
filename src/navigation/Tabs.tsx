import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../settings/color'

import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    // screenOptions에서는 props=>props.theme으로 접근할 수 없기 때문에 기존처럼 사용한다
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