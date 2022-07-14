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
