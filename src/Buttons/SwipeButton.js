import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const SwipeButton = (props) => {

    const { text, colour } = props;

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
        },
        text: {
            color: colour,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default SwipeButton;