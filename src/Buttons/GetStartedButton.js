import { TouchableOpacity , Text, StyleSheet } from 'react-native';


/**
 * A react native component that is used as a button for calling the startGame function and navigating
 * the user to the gamescreen
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent
 * @param {Function} props.onPress - receives the onPress function from the parent
 * @returns {JSX.Element} The rendered GetStartedButton component
 * 
 * @example
 * // Example usage of the GetStartedButton component
 * import GetStartedButton from './buttons/GetStartedButton';
 * 
 * <GetStartedButton onPress={startGame} />
 */

const GetStartedButton = ({onPress}) => {
    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will start the game, ensure you have a track selected."
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel="Get started" style={styles.text}>Get Started</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create ({
    button: {
        backgroundColor: '#1ED750',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        maxWidth: 300,
    },
    text: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GetStartedButton;