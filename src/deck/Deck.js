import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import SongCard from '../cards/SongCard';
import SwipeButton from '../Buttons/SwipeButton';
import { handlePlaylistRecommendations } from '../api/Spotify - Util/HandleRecommendations';

/**
 * A react native component that is used as a the deck containing the tracks for the Swiping game
 * This component Swiper component to render and handle the swiping functionality
 * 
 * @component
 * @param {Object} props - Properties passed to the component from the parent.
 * @param {array} props.trackIds - An array of trackIds for use in the game
 * @param {Function} props.handleLike - A function for storing liked songs
 * @param {Function} props.handleDislike - A function for storing disliked songs
 * @param {string} props.accessToken - A string containing the spotify accessToken for the user
 * @param {string} props.market - The users market used for making api calls and getting responses available in their location
 * @param {Function} props.saveRecommendedTrackIds - A function which saves the recommendedTrackIds to context
 * @param {array} props.likedSongs - An array of the songs the user liked
 * @param {array} props.dislikedSongs - An array of the songs the user disliked
 * 
 * @returns {JSX.Element} The rendered Deck component
 * 
 * @example
 * // Example usage of the Deck component
 * import Deck from './deck/Deck';
 * 
 * <Deck 
    trackIds={gameTrackIds} 
    handleLike={handleLike} 
    handleDislike={handleDislike} 
    accessToken={accessToken} 
    market={market} 
    saveRecommendedTrackIds={saveRecommendedTrackIds}
    likedSongs={likedSongs}
    dislikedSongs={dislikedSongs}
  />
 */

const Deck = ({ trackIds, handleLike, handleDislike, accessToken, market, saveRecommendedTrackIds, likedSongs, dislikedSongs }) => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    } else {
      console.log("Swiper ref is not available");
    }
  };

  const handleSwipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    } else {
      console.log("Swiper ref is not available");
    }
  };

  const handleSwipeDown = () => {
    if (swiperRef.current) {
      swiperRef.current.jumpToCardIndex(currentIndex - 1);
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      console.log('Swiper ref is not available');
    }
  };

  const styles = StyleSheet.create({
    deckContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    btnContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      marginTop: 500,
      zIndex: 1,
    },
    btn: {
      marginTop: 10,
      backgroundColor: 'blue',
      width: 50,
      height: 50,
    },
  });

  return (
    <View style={styles.deckContainer}>
      <Swiper
        ref={swiperRef}
        cards={trackIds}
        renderCard={(song) => <SongCard trackId={song} />}
        onSwiped={(cardIndex) => setCurrentIndex(cardIndex)}
        onSwipedRight={(cardIndex) => {
          handleLike(trackIds[cardIndex]);
          setCurrentIndex(cardIndex + 1);
        }}
        onSwipedLeft={(cardIndex) => {
          handleDislike(trackIds[cardIndex]);
          setCurrentIndex(cardIndex + 1);
        }}
        goBackToPreviousCardOnSwipeBottom={true}
        onSwipedAll={() => handlePlaylistRecommendations(accessToken, likedSongs, navigation, market, saveRecommendedTrackIds, dislikedSongs)}
        cardIndex={currentIndex}
        backgroundColor={'transparent'}
        stackSize={5}
        disableTopSwipe
      />
      <View style={styles.btnContainer} pointerEvents="box-none">
        <SwipeButton text={'No'} colour={'red'} onPress={handleSwipeLeft} />
        <SwipeButton text={'Go Back'} colour={'orange'} onPress={handleSwipeDown} />
        <SwipeButton text={'Yes'} colour={'#1ED750'} onPress={handleSwipeRight} />
      </View>
    </View>
  );
};

export default Deck;