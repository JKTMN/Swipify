import { TouchableOpacity , Text, StyleSheet } from 'react-native';


/**
 * A react native component that is used as a button for calling the handleCreatePlaylist function and navigating
 * the user to the homescreen
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent.
 * @param {Function} props.onPress - receives the onPress function from the parent
 * @returns {JSX.Element} The rendered CreatePlaylistButton component
 * 
 * @example
 * // Example usage of the CreatePlaylistButton component
 * import CreatePlaylistButton from './buttons/CreatePlaylistButton';
 * 
 * <CreatePlaylistButton onPress={handleCreatePlaylist} />
 */

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