import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/Tabs'
import Stack from '../navigation/Stack'

// Root Navigator또한 Stack Navigator이기 때문에 무언가를 비활성화시켜야된다
const Nav = createNativeStackNavigator();

const Root = () => (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name='Tabs' component={Tabs} />
        <Nav.Screen name='Stack' component={Stack} />
    </Nav.Navigator>
)

export default Root;