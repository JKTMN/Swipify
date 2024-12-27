import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import {ThemeProvider} from './src/context/ThemeContext';

import StackNavigator from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/AccessTokenContext';

import { UserProvider } from './src/context/UserDetailsContext';


export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </UserProvider>
  );
}