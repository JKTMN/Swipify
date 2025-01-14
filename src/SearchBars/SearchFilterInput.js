import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ThemeContext from '../context/ThemeContext';
import SearchButton from '../Buttons/SearchButton';

/**
 * The SearchFilterInput is a component used for entering a search query for the Spotify Search API.
 * @param {Object} props - Properties passed to the component.
 * @param {string} props.value - The search query.
 * @param {string} props.onChangeText - String that updates as the user enters the query.
 * @param {string} props.placeholder - String that is used in place of the search query before the user inputs anything.
 * @param {function} props.OnPress - function passed to the component from the parent.
 * 
 * @returns {JSX.Element} The rendered SearchfilterInput component.
 * 
 * @example
 * //Example usage of the SearchFilterInput component
 * import SearchFilterInput from './SearchBars/SearchFilterInput';
 * 
 * <SearchFilterInput
    placeholder="Search..."
    placeholderTextColor={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
    value={query}
    onChangeText={setQuery}
    onPress={handleSearch}
   />
 */

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 }}>
            <View accessible={true} style={styles.inputSection}>
                <AntDesign
                    name="search1"
                    size={24}
                    color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
                />
                <TextInput
                    accessible={true}
                    accessibilityLabel="search bar text input"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.searchInput}
                />
            </View>
            <SearchButton 
            onPress={onPress} />
        </View>
    );
}

export default SearchFilterInput;
