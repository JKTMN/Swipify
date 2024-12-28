import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import GetStartedButton from '../Buttons/GetStartedButton';
import SearchFilterInput from '../SearchBars/SearchFilterInput';
import ResultList from '../flatlists/ResultsList';
import { SearchForItem } from '../api/SpotifySearchForItem';
import { TypeContext } from '../context/TypeContext';
import { useAccessToken } from '../api/SpotifyUseAccessToken';
import { TracklistContext } from '../context/GameTracklist';
import { UserContext } from '../context/UserDetailsContext';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  // const { type } = useContext(TypeContext);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const { saveTracklist } = useContext(TracklistContext);
  const { market } = useContext(UserContext);

  const accessToken = useAccessToken();

  const handleSearch =  async () => {
    try {
      const searchResults = await(SearchForItem(accessToken, query, market)); //add type back here when/if needed
      setResults(searchResults);
      saveTracklist(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginBottom: 10,
      marginTop: 30,
    },
    subtitle: {
      fontSize: 16,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Search for an artist, song, or genre</Text>
        <SearchFilterInput
          placeholder="Search..."
          placeholderTextColor={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
          value={query}
          onChangeText={setQuery}
          onPress={handleSearch}
        />
        <ResultList data={results} imgSize={55} headingSize={16} descriptionSize={14}/>
        {results && results.length > 0 && <GetStartedButton />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;