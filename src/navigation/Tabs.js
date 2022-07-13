import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../settings/color'

import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        // 직접 스타일지정하면 시간이 오래걸리기 때문에 NavigationContainer에서 theme을 설정하는게 더 빠를것같다
        <Tab.Navigator initialRouteName="Movies" screenOptions={{ tabBarStyle: { backgroundColor: isDark ? colors.DARK_GRAY : colors.WHITE }, tabBarActiveTintColor: colors.BURBPLE_LIGHT, tabBarLabelStyle: { fontSize: 13, fontWeight: '600', }, tabBarInactiveTintColor: isDark ? colors.WHITE_GRAY : '#778ca3', headerStyle: { backgroundColor: isDark ? colors.DARK_GRAY : colors.WHITE }, headerTitleStyle: { color: colors.BURBPLE_LIGHT } }}>
            {/* <Tab.Navigator initialRouteName="Movies" > */}
            <Tab.Screen name='Movies' component={Movies} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name='film' color={color} size={size} />
            }} />
            {/* tabBarBadge은 빨간 색벳지 안에 적힐 문구 설정가능 */}
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

// dark모드여부를 확인하는 방법
// 유저의 모드에 따라 스타일을 적용시킬 수 잇다
// color scheme을 가져오는 useColorScheme hook이 있고 Appearance module이 잇다
// Appearance module에는 몇몇 function과 method를 제공하는데 getColorScheme() 등의 이해가 쉬운 메서드가 있다
// 그리고 addChangeListener() 라는 이벤트리스너가 있는데 어떤 변화가 있는지 검사할 수 있다

// 그 중에서 우리는 useColorScheme을 사용할건데 다크모드인지 확인해주고 업데이트되는지의 여부도 확인해준다
// 또한 iOS 시뮬레이터에서 다크모드와 라이트모드를 빠르게 바꿀 수 잇는 shortcut이 잇다
