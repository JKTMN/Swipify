import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';

const CreatePlaylistButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Create Playlist</Text>
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

export default CreatePlaylistButton;