import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
            <View style={styles.button}><Text style={styles.buttonText}>Change Title</Text></View>
        </TouchableOpacity>
    </View>
)

const NativeStack = createNativeStackNavigator();
const Stack = () => (
    <NativeStack.Navigator screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
        <NativeStack.Screen name='One' component={ScreenOne} />
        <NativeStack.Screen name='Two' component={ScreenTwo} />
        <NativeStack.Screen name='Three' component={ScreenThree} options={{ presentation: 'modal', }} />
    </NativeStack.Navigator>
);
export default Stack;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#54a0ff',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40
    },
    buttonText: {
        color: 'white'
    }
});

// 인스타그램은 Tab Navigation을 기반으로 만들었다
// 하지만 만약 내가 누군가의 Profile을 누르면 Tab안에 있는 Stack Navigation이다 