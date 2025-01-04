import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LinkAccountButton = ({onPress}) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Link Account</Text>
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
        marginHorizontal: 10,
    },
    text: {
        color: '#FCFCFC',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LinkAccountButton;