import { TouchableOpacity , Text, StyleSheet } from 'react-native';

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