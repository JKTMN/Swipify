import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {ThemeProvider} from './src/context/ThemeContext';

import StackNavigator from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/AccessTokenContext';

import { UserProvider } from './src/context/UserDetailsContext';
import { TracklistProvider } from './src/context/GameTracklist';
import { PlaylistsProvider } from './src/context/PlaylistsContext';


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