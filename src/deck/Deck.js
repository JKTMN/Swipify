import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ThemeContext from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

import SongCard from '../cards/SongCard';

const Deck = ({trackIds}) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    deckContainer: {
      flex: 0.95,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '50%',
    },
    text: {
      textAlign: "center",
      fontSize: 30,
      backgroundColor: "transparent"
    }
});


  return (
    <View style={styles.deckContainer}>
      <Swiper
          cards={trackIds}
          renderCard={(song) => <SongCard trackId={song} />}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => navigation.navigate('PlaylistDetails')}
          cardIndex={0}
          backgroundColor={'transparent'}
          stackSize={10}
          disableTopSwipe
        />
    </View>
  );
};

export default Deck;
