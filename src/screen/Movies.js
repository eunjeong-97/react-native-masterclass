import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const Movies = ({ navigation: { navigate } }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Stack Navigator의 Three Screen으로 이동한다는 뜻이다 */}
            <TouchableOpacity onPress={() => navigate('Stack', { screen: "Three" })}>
                <Text>Movies</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Movies;