import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import PlaylistList from '../flatlists/PlaylistsList';
import CreatePlaylistButton from '../Buttons/CreateNewPlaylistButton';
import { PlaylistsContext } from '../context/PlaylistsContext';

/**
 * PlaylistScreen is a screen used in BottomTabsNavigator and is used for displaying the playlists the user has 
 * created using the application.
 * 
 * @returns {JSX.Element} The rendered PlaylistsScreen component.
 */

const PlaylistScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { playlists } = useContext(PlaylistsContext);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#FCFCFC',
      alignItems: 'center',
      padding: 20,
      paddingTop: 30,
      paddingBottom: 50,
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
          <Text accessible={true} accessabilityLabel="You haven't generated any playlists yet. Click the button below to begin"
            style={styles.subtitle}>
            You haven’t generated any playlists yet. Click the button below to begin.
          </Text>
          <CreatePlaylistButton onPress={() => navigation.navigate('CreatePlaylist')} />
        </View>
      ) : (
        <>
          <PlaylistList data={playlists} />
          <CreatePlaylistButton onPress={() => navigation.navigate('CreatePlaylist')} />
        </>
      )}
    </SafeAreaView>
  );
};

export default PlaylistScreen;