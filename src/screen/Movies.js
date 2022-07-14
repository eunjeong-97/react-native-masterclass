import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const Movies = ({ navigation: { navigate } }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigate('Stack', { screen: "Three" })}>
                <Text>Movies</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Movies;

// navigate('Three') 이라고만 하면 Navigator사이를 이동하려고 하기 때문에 Movies버튼을 눌러도 작동하지 않는다
// Tabs Navigator에서 Stack Navigator로 이동하려고 했기 때문이다
// 그래서 먼저 Stack Navigator로 이동하고 싶다고 알려주고 그 다음에 우리가 가고자 하는 Stack Navigator 내부 스크린의 이름을 써주면 된다
// 같은 Navigator 안에서 스크린을 변경하고 싶은경우 navigate('스크린이름') 으로만 적어도 되지만
// 만약 하나의 Navigator가 두 개의 다른 Navigator를 렌더링하고 있고 그리고 Navigator 사이를 이동하고 싶다면

// Movies 스크린에서 Root Navigator로 나가고 싶어하고
// Root에서 Stack Navigator에 들어가서 ScreenThree로 이동하려고 할때
// navigate('Stack', { screen: "Three" }) 이렇게 적어주면된다
// 보통 Navigator를 렌더링할때 presentation을 변경하는데 
