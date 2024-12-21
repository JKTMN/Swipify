import React, { useContext, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme, TouchableOpacity, OnPress } from 'react-native';

import ThemeContext from '../context/ThemeContext';

import LinkAccountButton from '../Buttons/LinkAccountButton';

const AccountScreen = () => {
  const systemTheme = useColorScheme();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? '#2B2B2B' : '#FCFCFC';
    toggleTheme(newTheme);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginBottom: 10,
    },
    heading: {
      fontSize: 24,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginLeft: 15,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    buttonText: {
      fontSize: 16,
      color: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    button: {
      marginTop: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      height: 30,
      borderRadius: 15,
    },
    buttonAcc: {
      marginTop: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      height: 30,
      width: 150,
      borderRadius: 15,
    },
    text: {
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Account Screen</Text>
        <Text style={styles.heading}>Toggle Theme</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => toggleTheme('light')}><Text style={styles.buttonText}>Light Theme</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => toggleTheme('dark')}><Text style={styles.buttonText}>Dark Theme</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => useSystemTheme()}><Text style={styles.buttonText}>System Theme</Text></TouchableOpacity>
            </View>
            <View>
              <LinkAccountButton />
            </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
