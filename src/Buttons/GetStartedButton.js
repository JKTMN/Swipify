import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const GetStartedButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create ({
    button: {
        backgroundColor: '#1ED750',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        maxWidth: 300,
    },
    text: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GetStartedButton;