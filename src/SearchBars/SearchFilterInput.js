import React, { useContext} from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeContext from '../context/ThemeContext';

function SearchFilterInput ({ value, onChangeText, placeholder }) {
    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create ({
        inputSection: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            margin: 16,
        },
        searchInput: {
            flex: 1,
            height: 40,
            marginLeft: 10,
            color: theme === 'dark' ? '#2B2B2B' : '#2B2B2B',
        },
    });

    return (
        <View style={styles.inputSection}>
            <AntDesign name="search1" size={24} color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'} />
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={styles.searchInput} />
        </View>
    );
}

export default SearchFilterInput;