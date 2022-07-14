import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/Tabs'
import Stack from '../navigation/Stack'

const Nav = createNativeStackNavigator();

const Root = () => (
    // 여기서 header를 안보이게 했지만
    // Tabs Navigator의 Header만 보이지 않고 Stack Navigator의 Header는 보이게 된다
    // <Nav.Navigator screenOptions={{ headerShown: false }}>

    // 기본적으로 하단의 Tab Navigator가 보이도록 Tabs 스크린을 상단에 두었고
    // 이렇게 되면 Root Navigator의 Title이라고 적힌 Header와
    // 하단에 Stack Navigator의 Header 총 두줄의 Header가 보이기 때문에
    // Root Navigator의 Header를 보이지 않도록 한다
    <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name='Tabs' component={Tabs} />
        <Nav.Screen name='Stack' component={Stack} />
    </Nav.Navigator>
)

export default Root;