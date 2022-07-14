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

// theme은 단지 자바스크립트 obect이지만 시간을 많이 절약해준다
// ThemeProvider라는 Component를 사용한다
// ThemeProvider는 theme이라는 object를 prop으로 받는다
// ThemePrivider의 자식요소에서 import할 필요없이 theme object에 접근이 가능하다
// 다크모드를 구현하려고 할때 매번 useColorSheme()이 dark인지 체크하지 않아도 되고 직접 color를 지정하지 않아도 된다