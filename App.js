import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import {ThemeProvider} from './src/context/ThemeContext';

import StackNavigator from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/AccessTokenContext';


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}