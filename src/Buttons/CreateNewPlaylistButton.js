import React from 'react';
import { TouchableOpacity , Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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