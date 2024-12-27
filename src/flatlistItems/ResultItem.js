import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ThemeContext from '../context/ThemeContext';

const ResultItem = (props) => {
    const { theme } = useContext(ThemeContext);
    const { name, image, description, imgSize, headingSize, descriptionSize } = props;

    const styles = StyleSheet.create({
        listItemContainer: {
          width: '95%',
          alignSelf: 'center',
          flexDirection: 'column',
          padding: 5,
          marginBottom: 2.5,
          marginTop: 2.5,
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
        heading: {
          fontSize: headingSize,
          fontWeight: 'bold',
          color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
          marginBottom: 5,
        },
        description: {
          fontSize: descriptionSize,
          color: theme === 'dark' ? '#F5F5F5' : '#363636',
        },
        icon: {
          alignSelf: 'center',
          paddingRight: 10,
        },
      });

    return (
        <View style={styles.listItemContainer}>
          <View style={styles.row}>
              <Image source={{uri: image}} style={styles.image} />
              <View style={styles.textContainer}>
              <Text style={styles.heading}>{name}</Text>
              <Text style={styles.description}>{description}</Text>
              </View>
          </View>
        </View>



    );
}

export default ResultItem;