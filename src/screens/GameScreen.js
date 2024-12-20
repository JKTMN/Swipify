import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import ThemeContext from '../context/ThemeContext';

import Deck from '../deck/Deck';
import SwipeButton from '../Buttons/SwipeButton';

const GameScreen = () => {
  const { theme } = useContext(ThemeContext);

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
  });

  return (
    <SafeAreaView style={styles.container}>
        <Deck />
        <View style={styles.btnContainer}>
          <SwipeButton text={'No'} colour={'red'} />
          <SwipeButton text={'Maybe'} colour={'orange'} />
          <SwipeButton text={'Yes'} colour={'green'} />
        </View>
    </SafeAreaView>
  );
};

export default GameScreen;
