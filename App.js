import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import {ThemeProvider} from './src/context/ThemeContext';

import StackNavigator from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/AccessTokenContext';

import { UserProvider } from './src/context/UserDetailsContext';
import { TypeProvider } from './src/context/TypeContext';
import { TracklistProvider } from './src/context/GameTracklist';


export default function App() {
  return (
    <TracklistProvider>
      <TypeProvider>
        <UserProvider>
          <ThemeProvider>
            <AuthProvider>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </AuthProvider>
          </ThemeProvider>
        </UserProvider>
      </TypeProvider>
    </TracklistProvider>
  );
}