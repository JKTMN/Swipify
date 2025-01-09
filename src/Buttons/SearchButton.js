import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ThemeContext from '../context/ThemeContext';

const SearchButton = ({onPress}) => {
    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create ({
        searchButton: {
            backgroundColor: '#1ED750',
            borderColor: '#1ED750',
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginLeft: 8,
            height: 40,
        },
        searchButtonText: {
            color: '#2B2B2B',
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity style={styles.searchButton} onPress={onPress}>
            <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
    );
};

export default SearchButton;