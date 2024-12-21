import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateNewPlaylistButton = () => {
    const navigation = useNavigation();
        const goToHomeScreen = () => {
            navigation.navigate('Home');
          };
    return (
        <TouchableOpacity style={styles.button} onPress={goToHomeScreen}>
            <Text style={styles.text}>Create new playlist</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create ({
    button: {
        backgroundColor: '#1DB954',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: '#FCFCFC',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateNewPlaylistButton;