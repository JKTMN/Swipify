import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import Deck from '../deck/Deck';
import { TracklistContext } from '../context/GameTracklist';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserDetailsContext';

/**
 * GameScreen is used in the StackNavigator and is used for rending the deck component
 * used for the game.
 * 
 * @returns {JSX.Element} The rendered GameScreen component.
 */

const GameScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { gameTrackIds, saveLikedSongs, saveDislikedSongs, saveRecommendedTrackIds, likedSongs, dislikedSongs } = useContext(TracklistContext);
  const { accessToken } = useContext(AuthContext);
  const { market } = useContext(UserContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#FCFCFC',
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

  /**
   * @function handleLike
   * @function saveLikedSongs
   * @param {string} songId - The trackId that the user liked, and adds the track id to the liked songs context.
   */
  const handleLike = (songId) => {
    saveLikedSongs(songId);
  };

    /**
   * @function handleDislike
   * @function saveDislikedSongs
   * @param {string} songId - The trackId that the user disliked, and adds the track id to the disliked songs context.
   */
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