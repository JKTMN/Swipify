import React, { useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeContext from '../context/ThemeContext';
import DropDown from '../dropdown/Dropdown';
import SearchButton from '../Buttons/SearchButton';

function SearchFilterInput({ value, onChangeText, placeholder, onPress }) {
    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        inputSection: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            margin: 16,
            flex: 1,
        },
        searchInput: {
            flex: 1,
            height: 40,
            marginLeft: 10,
            color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
        },
    });

    return (
        // <View style={styles.inputSection}>
        //     <TouchableOpacity onPress={onPress}>
        //         <AntDesign name="search1" size={24} color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'} />
        //     </TouchableOpacity>
        //     <TextInput
        //         placeholder={placeholder}
        //         value={value}
        //         onChangeText={onChangeText}
        //         style={styles.searchInput}
        //     />
        //     <DropDown />
        // </View> 

        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
            <View style={styles.inputSection}>
                <AntDesign
                    name="search1"
                    size={24}
                    color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
                />
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.searchInput}
                />
            </View>
            <SearchButton onPress={onPress} />
        </View>
    );
}

export default SearchFilterInput;
