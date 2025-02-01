import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import ThemeContext from '../context/ThemeContext';
import { ExplicitIcon } from '../ExplicitIcon/ExplicitIcon';

/**
 * A react native component that is used as the list item render for the ResultsList
 * This component utilises A Touchable Opacity for turning the item into a button
 * 
 * @component
 * @param {object} props - Properties passed to the component from the parent.
 * @param {string} props.name - a string containing the track name
 * @param {string} props.image - a string containing the url for the playlist cover art
 * @param {string} props.artist - a string containing the track artists
 * @param {number} props.isSelected - an index of which track is selected
 * @param {Function} props.onPress - an onPress function passed from the parent
 * @param {bool} props.explicit - A bool stating if the track contains explicit lyrics or content
 * 
 * @returns {JSX.Element} The rendered ResultItem component
 * 
 * @example
 * // Example usage of the ResultItem component
 * import ResultItem from './flatlistItems/ResultItem';
 * 
 * renderItem={({ item, index }) => (
    <ResultItem
      name={item.name}
      image={item.image}
      artist={item.artist}
      isSelected={index === props.selectedIndex}
      onPress={() => props.onPress(index)}
    />
  )}
 */

const ResultItem = ({ name, image, artist, isSelected, onPress, explicit }) => {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    listItemContainer: {
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'column',
      padding: 5,
      marginBottom: 2.5,
      marginTop: 2.5,
      backgroundColor: isSelected ? (theme === 'dark' ? '#444' : '#ddd') : 'transparent',
      borderRadius: 5,
      minWidth: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 55,
      height: 55,
      marginRight: 10,
      borderRadius: 4,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    trackNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    trackName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FCFCFC' : '#121212',
      marginBottom: 5,
      marginRight: 5,
    },
    artist: {
      fontSize: 14,
      color: theme === 'dark' ? '#F5F5F5' : '#363636',
    },
    spotifyLogo: {
      height: 40,
      width: 40,
      justifyContent: 'flex-end',
      marginRight: 30,
    },
  });

  return (
    <TouchableOpacity accessible={true} 
    accessabilityLabel="Track item in list"
    accessabilityRole="button"
    accessabilityHint="Select a track"
    onPress={onPress}>
      <View style={styles.listItemContainer}>
        <View style={styles.row}>
          <Image accessabilityLabel="Track cover image" source={{ uri: image }} style={styles.image} />
          <View style={styles.textContainer}>
          <View style={styles.trackNameContainer}>
              <Text accessibilityLabel={`Track name: ${name}`} style={styles.trackName}>{name}</Text>
              {explicit && <ExplicitIcon />}
            </View>
            <Text accessabilityLabel={`By: ${artist}`}style={styles.artist}>{artist}</Text>
          </View>
          <Image accessabilityLabel="Spotify Logo"
           source={theme === 'dark' ? require('../../assets/SpotifyLogo/Spotify_Logo_White.png') : require('../../assets/SpotifyLogo/Spotify_Logo_Black.png')} 
           style={styles.spotifyLogo} />
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default ResultItem;