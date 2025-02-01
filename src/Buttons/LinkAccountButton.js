import { TouchableOpacity , Text, StyleSheet } from 'react-native';

/**
 * A react native component that is used as a button for calling the Spotify OAuth function, allowing the
 * user to sign into their spotify account
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent
 * @param {Function} props.onPress - receives the onPress function from the parent
 * @returns {JSX.Element} The rendered LinkAccountButton
 * 
 * @example
 * // Example usage of the LinkAccountButton component
 * import LinkAccountButton from './buttons/LinkAccountButton';
 * 
 * <LinkAccountButton onPress={handleLinkAccount} />
 */

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