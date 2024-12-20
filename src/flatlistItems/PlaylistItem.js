import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ThemeContext from '../context/ThemeContext';

const PlaylistItem = (props) => {
    const { theme } = useContext(ThemeContext);
    const { title, image, description } = props;

    const styles = StyleSheet.create({
        listItemContainer: {
          width: '95%',
          borderWidth: 2,
          borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
          borderRadius: 10,
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
        <View style={styles.listItemContainer}>
        <View style={styles.row}>
            <Image source={image} style={styles.image} />
            <View style={styles.textContainer}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            </View>
            <AntDesign
            name="right"
            size={24}
            color={theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}
            style={styles.icon}
            />
        </View>
        </View>



    );
}

export default PlaylistItem;