import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme, TouchableOpacity } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import LinkAccountButton from '../Buttons/LinkAccountButton';
import authenticateWithSpotify from '../api/Spotify - Auth/spotifyAuth';
import { UserContext } from '../context/UserDetailsContext';
import { AuthContext } from '../context/AccessTokenContext';
import { GetUserDetails } from '../api/Spotify - Util/SpotifyGetUserDetails';
import { SelectCountry } from 'react-native-element-dropdown';
import LogoutButton from '../Buttons/LogoutButton';
import { PlaylistsContext } from '../context/PlaylistsContext';

/**
 * AccountScreen is screen used in the BottomTabsNavigator and is used for rendering
 * the users spotify profile, link account button, theme toggle and logout button.
 * 
 * @returns {JSX.Element} The rendered AccountScreen component.
 */

const AccountScreen = () => {
  const systemTheme = useColorScheme();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);
  const { accessToken, clearToken } = useContext(AuthContext);
  const { saveUserDetails, renderProfile, clearUserDetails } = useContext(UserContext);
  const { clearPlaylists } = useContext(PlaylistsContext);
  const [authCode, setAuthCode] = useState(null);

  /**
   * Handles the linking of the users Spotify account.
   * Fetches user details and saves them in the UserContext.
   * @async
   * @function handleLinkAccount
   * @returns {Promise<void>}
   */

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

  /**
   * Handles theme change based on the selected option from the dropdown component.
   * @function handleThemeChange
   * @param {Object} selected - The selected theme option.
   * @param {string} selected.value - The value of the selected theme
   */

  const handleThemeChange = (selected) => {
    if (selected.value === 'system') {
      useSystemTheme();
    } else {
      toggleTheme(selected.value);
    }
  };

  /**
   * Logs the user out of their account by clearing tokens, user details, and playlists.
   * @function handleLogout
   */

  const handleLogout = () => {
    clearToken();
    clearUserDetails();
    clearPlaylists();
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
      backgroundColor: '#1ED750',
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
      color: '#2B2B2B',
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
    logoutBtnContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 50,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {renderProfile(theme)}
      <View style={styles.content}>
        <View accessability={true} style={styles.loginContainer}>
          <Text accessabilityLabel="Press the button below to link your spotify account" style={styles.heading}>Press the button below to link your Spotify account!</Text>
          <LinkAccountButton onPress={handleLinkAccount} />
          {authCode}
        </View>
        <View>
          <View accessability={true} style={styles.dropdownContainer}>
            <Text accessabilityLabel="Toggle theme" style={styles.heading}>Toggle theme:</Text>
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
            /> {/* Add accessability here! */}
          </View>
        </View>

        <View style={styles.logoutBtnContainer}>
          <LogoutButton onPress={handleLogout}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;