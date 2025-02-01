import { TouchableOpacity , Text, StyleSheet } from 'react-native';

/**
 * A react native component that is used as a substitute swiper button for swiping the game deck of tracks
 * This component utilises A Touchable Opacity for dealing with button functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent
 * @param {string} props.text - a string which should be displayed in the button
 * @param {string} props.colour - a string which is used for setting the button colour
 * @param {Function} props.onPress - receives the onPress function from the parent
 * @returns {JSX.Element} The rendered CreatePlaylistButton component
 * 
 * @example
 * // Example usage of the SwipeButton component
 * import SwipeButton from './buttons/SwipeButton';
 * 
 * <SwipeButton text={'No'} colour={'red'} onPress={handleSwipeLeft} />
 */

const SwipeButton = ({text, colour, onPress}) => {

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
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will make the swipe gesture:" 
        style={styles.button} 
        onPress={onPress}>
            <Text accessabilityLabel={text} style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default SwipeButton;