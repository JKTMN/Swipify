import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import ThemeContext from '../context/ThemeContext';

const ResultItem = ({ name, image, description, imgSize, headingSize, descriptionSize, artist, isSelected, onPress }) => {
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
      width: imgSize,
      height: imgSize,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    trackName: {
      fontSize: headingSize,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
      marginBottom: 5,
    },
    artist: {
      fontSize: descriptionSize,
      color: theme === 'dark' ? '#F5F5F5' : '#363636',
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
            <Text accessabilityLabel={`Track name: ${name}`} style={styles.trackName}>{name}</Text>
            <Text accessabilityLabel={`Track artists: ${artist}`}style={styles.artist}>{artist}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default ResultItem;