import { TouchableOpacity , Text, StyleSheet } from 'react-native';

/**
 * A react native component that is used as a button for calling the handleLogout function
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent
 * @param {Function} onPress - receives the onPress function from the parent
 * @returns {JSX.Element} The rendered LogoutButton component
 * 
 * @example
 * // Example usage of the LogoutButton component
 * import LogoutButton from './buttons/LogoutButton';
 * 
 * <LogoutButton onPress={handleLogout} />
 */

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