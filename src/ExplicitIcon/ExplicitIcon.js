import { StyleSheet, View, Text } from "react-native";

/**
 * A react native component used for displaying if the track contains explicit lyrics or content.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered explicit icon component.
 * 
 * //Example use
 * 
 * import ExplicitIcon from './ExplicitIcon/ExplicitIcon
 * 
 * {explicit && <ExplicitIcon />} 
 */
export const ExplicitIcon = () => {
    return (
        <View style={styles.circle}>
            <Text style={styles.text}>18</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 15,
        height: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 7.5,
        color: 'white',
    },
});