import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import GetStartedButton from '../Buttons/GetStartedButton';
import SearchFilterInput from '../SearchBars/SearchFilterInput';
import ResultList from '../flatlists/ResultsList';

import getPlaylistData from '../api/GetTempPlaylists';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlaylistData();
        setPlaylists(data || []);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
        setPlaylists([]);
      }
    };

    fetchData();
  }, []);

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
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <ResultList data={playlists} imgSize={55} headingSize={16} descriptionSize={14}/>
        <GetStartedButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
