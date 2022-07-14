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
            {/* <View style={styles.button}><Text style={styles.buttonText}>Change Title</Text></View> */}
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


// 여기서만 적는 View나 Text는 react-native에서 따로 import하지 않아도 된다
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

// 자동완성은 되지 않지만 이렇게 import하지 않은 컴포넌트도 사용가능
const Test = styled.TouchableWithoutFeedback``;

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: '#54a0ff',
//         color: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 100,
//         height: 40
//     },
//     buttonText: {
//         color: 'white'
//     }
// });

// styled-components는 css코드를 native component가 써도 스타일 적용을 해준다

export default Stack;