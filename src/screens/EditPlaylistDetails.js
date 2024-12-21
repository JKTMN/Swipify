import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, useColorScheme, TouchableOpacity, OnPress, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ThemeContext from '../context/ThemeContext';
import ResultList from '../flatlists/ResultsList';
import CreatePlaylistButton from '../Buttons/CreatePlaylistButton';


const EditPlaylistDetailsScreen = () => {
  const { theme } = useContext(ThemeContext);  

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
      },
      content: {
          flex: 1,
          alignItems: 'center',
          padding: 30,
      },
      image: {
        width: 150,
        height: 150,
        backgroundColor: 'grey',
      },
      imageText: {
        fontSize: 20,
        marginBottom: 40,
      },
      input: {
        height: 40,
        width: 250,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        color: '#fff',
    },
    row: {
      width: '80%',
      flexDirection: 'row',
    },
  });


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.image}>
        </View>
        <Text style={styles.imageText}>Change cover art</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter playlist name"
            placeholderTextColor={'#000'}
            secureTextEntry
            value={null}
            onChangeText={null}
        />

        <TextInput
            style={styles.input}
            placeholder="Enter playlist description"
            placeholderTextColor={'#000'}
            secureTextEntry
            value={null}
            onChangeText={null}
        />
        </View>

        <View style={styles.results}>
          <View style={styles.row}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text>Your choices:</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text>Edit</Text>
              <Ionicons name="create-outline" size={24} color={'#000'} />
            </View>
          </View>
        </View>
        <CreatePlaylistButton />

      </View>

    </View>
  );
};

export default EditPlaylistDetailsScreen;
