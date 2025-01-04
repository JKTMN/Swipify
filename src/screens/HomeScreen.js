import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import GetStartedButton from '../Buttons/GetStartedButton';
import SearchFilterInput from '../SearchBars/SearchFilterInput';
import ResultList from '../flatlists/ResultsList';
import { SearchForItem } from '../api/Spotify - Search/SpotifySearchForItem';
import { TracklistContext } from '../context/GameTracklist';
import { UserContext } from '../context/UserDetailsContext';

import { handleStartGame } from '../api/SpotifyGetRecommendations';
import { useAccessToken } from '../api/Spotify - Util/SpotifyUseAccessToken';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { saveTracklist, trackIsrcs, saveGameTrackIds } = useContext(TracklistContext);
  const { market } = useContext(UserContext);

  const accessToken = useAccessToken();

  const handleSearch = async () => {
    try {
      const searchResults = await SearchForItem(accessToken, query, market);
      setResults(searchResults);
      setSelectedIndex(null);
      console.log("Search results:", searchResults);

      if (selectedIndex !== null) {
        saveTracklist(searchResults[selectedIndex]);
      } else {
        console.log('No item selected');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleItemPress = (index) => {
    setSelectedIndex(index);
  };

  const startGame = async () => {
    try {
      if (selectedIndex !== null) {
        await handleStartGame(accessToken, trackIsrcs, saveGameTrackIds, navigation);
      }
    } catch (error) {
      console.error('Error starting game:', error);
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
    message: {
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginTop: '50%',
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
        <ResultList
          data={results}
          imgSize={55}
          headingSize={16}
          descriptionSize={14}
          selectedIndex={selectedIndex}
          onPress={handleItemPress}
        />
        {results && results.length > 0 ? (
          <GetStartedButton onPress={startGame} />
        ) : (
          <Text style={styles.message}>Search for a song to get started!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
