import React from 'react';
import { TouchableOpacity , Text, StyleSheet, onPress } from 'react-native';

const CreatePlaylistButton = ({onPress}) => {
    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will navigate you to the homepage, this will create your playlist"
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel="create playlist" style={styles.text}>Create Playlist</Text>
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
        marginTop: 20,
    },
    text: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreatePlaylistButton;