import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ThemeContext from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

import SongCard from '../cards/SongCard';
import SwipeButton from '../Buttons/SwipeButton';
import { handlePlaylistRecommendations } from '../api/Spotify - Util/HandleRecommendations';

const Deck = ({ trackIds, handleLike, handleDislike, accessToken, market, saveRecommendedTrackIds, likedSongs, dislikedSongs }) => {
  const { theme } = useContext(ThemeContext);
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