import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LinkAccountButton = ({onPress}) => {

    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will open the spotify login page"
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel="Link account" style={styles.text}>Link Account</Text>
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

export default LinkAccountButton;