import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ThemeContext from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const Deck = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    deckContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: '60%',
    },
    card: {
      flex: 0.75,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8", //Change??
      justifyContent: "center",
      backgroundColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B', //Change??
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
            cards={['Nothing Great about Britain', 'Noddy', 'Bullet from a gun', 'Six Paths']}
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        <Text style={styles.text}>{card}</Text>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => navigation.navigate('PlaylistDetails')}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize={3}
            disableBottomSwipe
            disableTopSwipe
        />
    </View>
  );
};

export default Deck;
