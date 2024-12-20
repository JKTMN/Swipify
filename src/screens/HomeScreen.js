<<<<<<< Updated upstream
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
=======
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
>>>>>>> Stashed changes
import ThemeContext from '../context/ThemeContext';
import GetStartedButton from '../Buttons/GetStartedButton';
import SearchFilterInput from '../SearchBars/SearchFilterInput';
import ResultList from '../flatlists/ResultsList';

import getPlaylistData from '../api/GetTempPlaylists';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    content: {
      flex: 1,
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
<<<<<<< Updated upstream
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to HomeScreen</Text>
        <Text style={styles.subtitle}>This is a simple React Native example.</Text>
      </View>
    </SafeAreaView>
=======
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Search for an artist, song, or genre</Text>
          <SearchFilterInput placeholder='Search...' value={searchTerm} onChangeText={setSearchTerm} />
          <ResultList data={playlists}/>
          <GetStartedButton/>
        </View>
      </SafeAreaView>
    </ScrollView>
>>>>>>> Stashed changes
  );
};

export default HomeScreen;
