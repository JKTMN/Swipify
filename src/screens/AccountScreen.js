import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import LinkAccountButton from '../Buttons/LinkAccountButton';
import authenticateWithSpotify from '../api/Spotify - Auth/spotifyAuth';
import { useUser } from '../context/UserDetailsContext';
import { AuthContext } from '../context/AccessTokenContext';
import { GetUserDetails } from '../api/Spotify - Util/SpotifyGetUserDetails';
import { SelectCountry } from 'react-native-element-dropdown';

const AccountScreen = () => {
  const systemTheme = useColorScheme();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);
  const { accessToken } = useContext(AuthContext);
  const { saveUserDetails, renderProfile } = useUser();

  const [authCode, setAuthCode] = useState(null);

  const handleLinkAccount = async () => {
    authenticateWithSpotify();
    try {
      const userDetails = await GetUserDetails(accessToken);
      saveUserDetails(userDetails);
    } catch (err) {
      console.error('Error in handleGetUserDetails:', err);
    }
  };

  const themeOptions = [
    { label: 'Light Theme', value: 'light' },
    { label: 'Dark Theme', value: 'dark' },
    { label: 'System Theme', value: 'system' },
  ];

  const handleThemeChange = (selected) => {
    if (selected.value === 'system') {
      useSystemTheme();
    } else {
      toggleTheme(selected.value);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    loginContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 20,
    },
    heading: {
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      fontSize: 20,
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    dropdown: {
      marginHorizontal: 10,
      height: 30,
      width: 150,
      backgroundColor: '#1DB954',
      borderRadius: 22,
      paddingHorizontal: 8,
      marginLeft: 50,
    },
    selectedText: {
      fontSize: 16,
      color: '#2B2B2B',
    },
    placeholderText: {
      fontSize: 16,
      color: '#FCFCFC',
    },
    dropdownMenu: {
      backgroundColor: '#1DB954',
      borderRadius: 10,
      padding: 10,
    },
    dropdownContainer: {
      marginVertical: 20,
      flexDirection: 'row',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {renderProfile(theme)}
      <View style={styles.content}>
        <View style={styles.loginContainer}>
          <Text style={styles.heading}>Press the button below to link your Spotify account!</Text>
          <LinkAccountButton onPress={handleLinkAccount} />
          {authCode && <Text>Authorization Code: {authCode}</Text>}
        </View>
        <View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.heading}>Toggle theme:</Text>
            <SelectCountry
              style={styles.dropdown}
              selectedTextStyle={styles.selectedText}
              placeholderStyle={styles.placeholderText}
              maxHeight={200}
              valueField="value"
              labelField="label"
              data={themeOptions}
              placeholder="Select Theme"
              searchPlaceholder="Search..."
              dropdownStyle={styles.dropdownMenu}
              onChange={handleThemeChange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
