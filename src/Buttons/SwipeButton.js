import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const SwipeButton = ({text, colour, onPress}) => {

    // const { text, colour, onPress } = props;

    const styles = StyleSheet.create ({
        button: {
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 10,
            borderColor: colour,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: 'transparent',
        },
        text: {
            color: colour,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default SwipeButton;