import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ThemeContext from '../context/ThemeContext';
import ResultList from '../flatlists/ResultsList';
import CreatePlaylistButton from '../Buttons/CreatePlaylistButton';
import getPlaylistData from '../api/GetTempPlaylists';
import ImageUploader from '../imageUploader/ImageUploader';

const EditPlaylistDetailsScreen = () => {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FCFCFC',
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      padding: 30,
    },
    imageText: {
      fontSize: 20,
      marginBottom: 40,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
    input: {
      height: 40,
      width: 250,
      borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 15,
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
    results: {
      flex: 1,
      width: '80%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    leftText: {
      textAlign: 'left',
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      paddingLeft: 15,
      marginBottom: 15,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageUploader />
      <Text style={styles.imageText}>Change cover art</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter playlist name"
          placeholderTextColor={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
          value={null}
          onChangeText={null}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter playlist description"
          placeholderTextColor={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
          value={null}
          onChangeText={null}
        />
      </View>

      <View style={styles.results}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Your choices:</Text>
            <TouchableOpacity style={styles.rightSection} onPress={() => alert("Edit button pressed!")}>
            <Text style={{ color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }}>Edit</Text>
            <Ionicons name="create-outline" size={24} color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'} />
            </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <ResultList data={getPlaylistData()} imgSize={40} headingSize={14} descriptionSize={12} />
        </View>
      </View>
      <CreatePlaylistButton />
    </ScrollView>
  );
};

export default EditPlaylistDetailsScreen;
