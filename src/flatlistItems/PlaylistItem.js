import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ThemeContext from '../context/ThemeContext';

const PlaylistItem = (props) => {
    const { theme } = useContext(ThemeContext);
    const { playlistId, name, description, image, tracks } = props;
    const navigation = useNavigation();

    const openPlaylistDetails = () => {
      navigation.navigate('PlaylistDetails',{playlistId, name, description, image, tracks});
    };

    const styles = StyleSheet.create({
        listItemContainer: {
          width: '95%',
          borderWidth: 1,
          borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
          borderRadius: 5,
          alignSelf: 'center',
          flexDirection: 'column',
          padding: 5,
          marginBottom: 5,
          marginTop: 2.5,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        image: {
          width: 60,
          height: 60,
          marginRight: 10,
        },
        textContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        heading: {
          fontSize: 18,
          fontWeight: 'bold',
          color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
          marginBottom: 5,
        },
        description: {
          fontSize: 14,
          color: theme === 'dark' ? '#F5F5F5' : '#363636',
        },
        icon: {
          alignSelf: 'center',
          paddingRight: 10,
        },
      });

    return (
        <TouchableOpacity 
        accessible={true}
        accessabilityLabel="Playlist item in list"
        accessabilityHint="Press to open playlist details"
        accessabilityRole="button"
        style={styles.listItemContainer} 
        onPress={openPlaylistDetails}>
          <View style={styles.row}>
              <Image accessabilityLabel="Playlist cover image" source={{uri: image}} style={styles.image} />
              <View style={styles.textContainer}>
              <Text accessabilityLabel={`Playlist name: ${name}`} style={styles.heading}>{name}</Text>
              <Text accessabilityLabel={`Playlist description: ${description}`} style={styles.description}>{description}</Text>
              </View>
              <AntDesign
              name="right"
              size={24}
              color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
              style={styles.icon}
              />
          </View>
        </TouchableOpacity>



    );
}

export default PlaylistItem;