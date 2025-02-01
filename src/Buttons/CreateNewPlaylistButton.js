import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * A react native component that is used as a button for navigating to the
 * homescreen from the playlists screen.
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * The button calls the goToHomeScreen function which uses navigation to direct the user
 * to the homescreen.
 * 
 * @returns {JSX.Element} The rendered CreateNewPlaylistButton component
 * 
 * @example
 * // Example usage of the CreateNewPlaylistButton component
 * import CreateNewPlaylistButton from './buttons/CreateNewPlaylistButton';
 * 
 * <CreateNewPlaylistButton />
 */

const CreateNewPlaylistButton = () => {
    const navigation = useNavigation();
    const goToHomeScreen = () => {
        navigation.navigate('Home');
        };

    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will navigate you to the homepage to get started in creating a new playlist."
        style={styles.button} 
        onPress={goToHomeScreen}>
            <Text accessabilityLabel="Create new playlist" style={styles.text}>Create new playlist</Text>
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

export default CreateNewPlaylistButton;