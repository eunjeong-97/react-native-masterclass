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
const Stack = () => <NativeStack.Navigator>
    <NativeStack.Screen name='One' component={ScreenOne} />
    <NativeStack.Screen name='Two' component={ScreenTwo} />
    {/* 왜 setOptions을 어디서 그리고 왜 하는지 모르겠다면 options={{ title }}  을 줄 수도 있다*/}
    <NativeStack.Screen name='Three' component={ScreenThree} />
</NativeStack.Navigator>;
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

// stack navigator와 Tap Navigator를 포함한 모든 screen navigator 혹은 component는 navigation prop을 제공한다
// 그리고 screens에 있지 않을때 navigation에 접근할 수잇는 방법

// setOptions function은 스크린옵션을 설정하게 해준다
// 예를들어 screen에 잇는동안의 screen 옵션을 변경할 수잇다
// ScreenThree에서 버튼을 눌렀을때 title을 변경할 수도 있다

// tab과 stack navigation을 합칠 때 tab navigator에 있으면서 navigation prop을 사용해
// tab에서 stack으로 어떻게 점프할지도 알아볼것이다
