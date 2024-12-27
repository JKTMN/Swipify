import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, Button } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import LinkAccountButton from '../Buttons/LinkAccountButton';
import authenticateWithSpotify from '../api/spotifyAuth';
import { Link } from '@react-navigation/native';
import { GetUserDetails } from '../api/SpotifyGetUserDetails';

const AccountScreen = () => {
  const systemTheme = useColorScheme();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);
  const [authCode, setAuthCode] = useState(null);

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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      marginTop: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      height: 30,
      borderRadius: 15,
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Account Screen</Text>
        <Text>Toggle Theme</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => toggleTheme('light')}>
            <Text>Light Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => toggleTheme('dark')}>
            <Text>Dark Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => useSystemTheme()}>
            <Text>System Theme</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <LinkAccountButton onPress={authenticateWithSpotify} />
          <LinkAccountButton onPress={GetUserDetails} />
          {authCode && <Text>Authorization Code: {authCode}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
