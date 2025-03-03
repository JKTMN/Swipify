import React, { useContext, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import GetStartedButton from '../Buttons/GetStartedButton';
import SearchFilterInput from '../SearchBars/SearchFilterInput';
import ResultList from '../flatlists/ResultsList';
import { SearchForItem } from '../api/Spotify - Search/SpotifySearchForItem';
import { TracklistContext } from '../context/GameTracklist';
import { UserContext } from '../context/UserDetailsContext';
import { handleStartGame } from '../api/Spotify - Util/HandleRecommendations';
import { AuthContext } from '../context/AuthContext';

/**
 * HomeScreen is used in the BottomTabsNavigator and acts as the landing page for the app.
 * HomeScreen renders components needed for starting the game, 
 * including: searching for track, artist, or genre, displays search results ready for user 
 * to choose track and start game
 * 
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { saveSelectedTrack, selectedTrackId, selectedTrack, gameTrackIds, saveGameTrackIds,} = useContext(TracklistContext);
  const { market } = useContext(UserContext);
  const { accessToken } = useContext(AuthContext);


  /**
   * @function handleSearch
   * searches for items using Spotify's search API.
   */
  const handleSearch = async () => {
    try {
      const searchResults = await SearchForItem(accessToken, query, market);
      setResults(searchResults);
      setSelectedIndex(null);

      if (selectedIndex !== null) {
        saveSelectedTrack(searchResults[selectedIndex]);
      } else {
        console.log('No item selected');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  /**
   * @function handleItemPress
   * Handles selection of a search result item.
   * @param {number} index - Index of the selected item in the search results.
   */
  const handleItemPress = (index) => {
    setSelectedIndex(index);
    saveSelectedTrack(results[index]);
  };

  /**
   * @function startGame
   * @async
   * 
   * Starts the game by triggering recommendations for the selected track.
   */
  const startGame = async () => {
    if (selectedIndex !== null) {
      try {
        if (selectedIndex !== null) {
          await handleStartGame(
            accessToken, 
            selectedTrack.artist,
            navigation, 
            market, 
            saveGameTrackIds
          );
        }
      } catch (error) {
        console.error('Error starting game:', error);
      }
    } else {
      alert('No item selected');
    }
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#FCFCFC',
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
      alignSelf: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
    message: {
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginTop: '50%',
      fontSize: 20,
      alignSelf: 'center',
    },
    imgContainer: {
      padding: 10,
      maxHeight: 80,
      width: '100%',
      marginBottom: 40,
    },
    img: {
      marginTop: 10,
      width: '100%',
      maxHeight: '100',
    },
    BtnContainer: {
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text accessible={true} accessibilityLabel="Search for an artist, song, or genre" style={styles.title}>Search for an artist, song, or genre</Text>
        <SearchFilterInput
          placeholder="Search..."
          placeholderTextColor={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
          value={query}
          onChangeText={setQuery}
          onPress={handleSearch}
        />
        <ResultList
          accessability={true}
          accessibilityLabel="List of tracks in search results"
          accessabilityHint="Select a track to get started"
          data={results}
          selectedIndex={selectedIndex}
          onPress={handleItemPress}
        />
        {results && results.length > 0 ? (
          <View accessible={true} style={styles.BtnContainer}><GetStartedButton onPress={startGame} /></View>
        ) : (
          <Text accessible={true} style={styles.message}>Search for a song to get started!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
