import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const LogoutButton = ({onPress}) => {

    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will log you out of spotify"
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel="Log out" style={styles.text}>Log Out</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create ({
    button: {
        backgroundColor: '#1ED750',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    text: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutButton;