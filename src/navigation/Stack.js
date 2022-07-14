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
    <NativeStack.Navigator >
        <NativeStack.Screen name='One' component={ScreenOne} />
        <NativeStack.Screen name='Two' component={ScreenTwo} />
        <NativeStack.Screen name='Three' component={ScreenThree} />
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
