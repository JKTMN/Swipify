import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ThemeContext from '../context/ThemeContext';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);

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
    subtitle: {
      fontSize: 16,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to HomeScreen</Text>
        <Text style={styles.subtitle}>This is a simple React Native example.</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
