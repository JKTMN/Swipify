import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const GetStartedButton = ({onPress}) => {
    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will start the game, ensure you have a track selected."
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel="Get started" style={styles.text}>Get Started</Text>
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