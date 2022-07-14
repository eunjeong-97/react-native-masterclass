import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/Tabs'
import Stack from '../navigation/Stack'

const Nav = createNativeStackNavigator();

const Root = () => (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name='Tabs' component={Tabs} />
        <Nav.Screen name='Stack' component={Stack} />
    </Nav.Navigator>
)

export default Root;