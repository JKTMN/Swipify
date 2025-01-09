import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

import ThemeContext from '../context/ThemeContext';

import Deck from '../deck/Deck';

import { TracklistContext } from '../context/GameTracklist';
import { AuthContext } from '../context/AccessTokenContext';
import { UserContext } from '../context/UserDetailsContext';

const GameScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { gameTrackIds, saveLikedSongs, saveDislikedSongs, saveRecommendedTrackIds, likedSongs, dislikedSongs } = useContext(TracklistContext);
  const { accessToken } = useContext(AuthContext);
  const { market } = useContext(UserContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    imgContainer: {
      padding: 10,
      maxHeight: 80,
      width: '100%',
    },
    img: {
      marginTop: 10,
      width: '100%',
      maxHeight: '100',
    },
  });

  const handleLike = (songId) => {
    saveLikedSongs(songId);
};

const handleDislike = (songId) => {
    saveDislikedSongs(songId);
};
  

  return (
    <SafeAreaView style={styles.container}>
        <Deck 
        trackIds={gameTrackIds} 
        handleLike={handleLike} 
        handleDislike={handleDislike} 
        accessToken={accessToken} 
        market={market} 
        saveRecommendedTrackIds={saveRecommendedTrackIds}
        likedSongs={likedSongs}
        dislikedSongs={dislikedSongs}
        />
    </SafeAreaView>
  );
};

export default GameScreen;