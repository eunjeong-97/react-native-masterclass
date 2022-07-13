import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from 'react-native';

import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'

// react navigation은 기본적으로 리액트컴포넌트로서 props, 설정 object에 기초하고 있다

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        // 처음으로 보여주는 화면을 Movies로 설정
        // screenOPtions prop을 Tab.navigator 안에서 사용해야 한다
        // 만약 아이콘의 색상을 변경하려고 하면 Tab.navigator 안에서 screenOptions을 사용해서 모든 tabs의 색상을 변경하면된다
        // 만약 모든 탭의 스타일을 변경하고 싶은게 아니라 메뉴별로 다르게 설정하고 싶다면 각 screen에 options prop을 사용하면 된다
        // 그래서 screensOprions은 모든 screen에 대한 옵션이고 options은 각 screen에 대한 것이다
        // https://reactnavigation.org/docs/bottom-tab-navigator 공식문서 참고해서 활용해봄
        // headerRight는 React Element를 리턴하는 함수인데 리턴되는 요소는 header 우측에 배치될 것이다 (아이콘을 설정해도 괜찮을것같다)
        <Tab.Navigator initialRouteName="Movies" screenOptions={{ tabBarLabelStyle: { backgroundColor: 'red' }, tabBarLabelPosition: 'beside-icon', tabBarActiveTintColor: 'black', headerTitleStyle: { color: 'tomato' }, headerTitleAlign: 'center', headerRight: () => <View><Text>Hello</Text></View> }}>
            <Tab.Screen name='Movies' component={Movies} />
            {/* tabBarBadge은 빨간색벳지 안에 적힐 문구 설정가능 */}
            <Tab.Screen name='Tv' component={Tv} options={{ tabBarLabelStyle: { backgroundColor: 'teal' }, tabBarBadge: 5 }} />
            <Tab.Screen name='Search' component={Search} />
        </Tab.Navigator>
    )
}

export default Tabs;

// screenOptions은 navigator 말 그대로 모든 screen에 적용할 설정이다
// options은 navigator의 단 하나의 화면에 적용할 설정이다