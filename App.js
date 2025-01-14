import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import StackNavigator from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/AccessTokenContext';
import { UserProvider } from './src/context/UserDetailsContext';
import { TracklistProvider } from './src/context/GameTracklist';
import { PlaylistsProvider } from './src/context/PlaylistsContext';

/**
 * The root component of the app, wrapping all providers and navigation logic.
 * This component sets up the application context and navigation, ensuring that
 * global contexts and theming are available throughout the app.
 * 
 * Providers included:
 * PlaylistsProvider: Manages the context for user playlists.
 * TracklistProvider: Manages the tracklists used throughout the app.
 * UserProvider: Provides user details like market, and renderProfile.
 * ThemeProvider: Manages the apps theme (Dark/Light mode).
 * AuthProvider: Supplies the Spotify accessToken for authenticated API calls. 
 * 
 * Navigation:
 * NavigationContainer: Wraps the main navigation logic.
 * StackNavigator: Defines the stack-based navigation for the app screens.
 * 
 * @returns {JSX.Element} The root of the app, wrapped with necessary providers and navigation.
 */

export default function App() {
  return (
    <PlaylistsProvider>
      <TracklistProvider>
        <UserProvider>
          <ThemeProvider>
            <AuthProvider>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </AuthProvider>
          </ThemeProvider>
        </UserProvider>
      </TracklistProvider>
    </PlaylistsProvider>
  );
}