import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';


const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate('Two')}>
        <View><Text>Go to Two</Text></View>
    </TouchableOpacity>
)
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate('Three')}>
        <View><Text>Go to Three</Text></View>
    </TouchableOpacity>
)
const ScreenThree = ({ navigation: { goBack, setOptions } }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => goBack()}>
            <View><Text>Go Back</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOptions({ title: 'Hello!' })}>
            <Button>
                <ButtonText selected={false}>Change Title</ButtonText>
            </Button>
        </TouchableOpacity>
    </View>
)

const NativeStack = createNativeStackNavigator();
const Stack = () => (
    <NativeStack.Navigator >
        <NativeStack.Screen name='One' component={ScreenOne} />
        <NativeStack.Screen name='Two' component={ScreenTwo} />
        <NativeStack.Screen name='Three' component={ScreenThree} />
    </NativeStack.Navigator>
);


const Button = styled.View`
    background-color:#54a0ff;
    justify-content:center;
    align-items:center;
    width:100px;
    height:40px;
`
const ButtonText = styled.Text`
    color: ${props => props.selected ? 'red' : "white"};
`

export default Stack;