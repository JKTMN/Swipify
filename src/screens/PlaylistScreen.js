import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';

import getPlaylistData from '../api/GetTempPlaylists';
import PlaylistList from '../flatlists/PlaylistsList';
import CreatePlaylistButton from '../Buttons/CreateNewPlaylistButton';

const PlaylistScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

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
      alignItems: 'center',
      padding: 20,
      paddingTop: 30,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginBottom: 10,
      marginTop: 20,
    },
    subtitle: {
      fontSize: 16,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {playlists.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.subtitle}>
            You haven’t generated any playlists yet. Click the button below to begin.
          </Text>
          <CreatePlaylistButton onPress={() => navigation.navigate('CreatePlaylist')} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Playlists you've generated</Text>
          <PlaylistList data={playlists} />
          <CreatePlaylistButton onPress={() => navigation.navigate('CreatePlaylist')} />
        </>
      )}
    </SafeAreaView>
  );
};

export default PlaylistScreen;