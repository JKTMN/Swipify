import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

import ThemeContext from '../context/ThemeContext';

import Deck from '../deck/Deck';
import SwipeButton from '../Buttons/SwipeButton';

import { TracklistContext } from '../context/GameTracklist';

const GameScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { gameTrackIds } = useContext(TracklistContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    btnContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
    },
    imgContainer: {
      height: 100,
      width: '100%',
      backgroundColor: 'green',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={''}></Image>
      </View>
        <Deck trackIds={gameTrackIds}/>
        <View style={styles.btnContainer}>
          <SwipeButton text={'No'} colour={'red'} />
          <SwipeButton text={'Maybe'} colour={'orange'} />
          <SwipeButton text={'Yes'} colour={'green'} />
        </View>
    </SafeAreaView>
  );
};

export default GameScreen;