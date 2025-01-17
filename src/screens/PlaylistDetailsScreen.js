import React, { useContext} from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import { ExplicitIcon } from '../ExplicitIcon/ExplicitIcon';

/**
 * PlaylistDetailsScreen is used in the StackNavigator and is used for displaying
 * details about the chosen playlist.
 * 
 * @returns {JSX.Element} The rendered PlaylistDetailsScreen component.
 */
const PlaylistDetailsScreen = () => {
    const { theme } = useContext(ThemeContext);
    const route = useRoute();
    const { name, description, image, tracks } = route.params;

    /**
     * @function truncateText
     * 
     * @param {string} text - The text that needs to be truncated.
     * @param {number} length - The length the string should be truncated at.
     * @returns 
     */
    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme === 'dark' ? '#121212' : '#FCFCFC',
        },
        playlistCover: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginBottom: 20,
        },
        textSection: {
            marginBottom: 8,
        },
        playlistName: {
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 5,
            color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
        },
        playlistDescription: {
            fontSize: 20,
            marginBottom: 15,
            color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        listImage: {
            width: 60,
            height: 60,
            marginRight: 16,
            borderRadius: 4,
        },
        textContainer: {
            flexDirection: 'column',
        },
        trackNameContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          },
        trackName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
            marginRight: 5,
        },
        artistName: {
            fontSize: 14,
            color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B',
        },
        spotifyLogo: {
            height: 20,
            width: 20,
            marginRight: 5,
          },
    });

    const renderItem = ({ item }) => (
        <View accessible={true} style={styles.listItem}>
            <Image accessabilityLabel="Spotify Logo"
            source={theme === 'dark' ? require('../../assets/SpotifyLogo/Spotify_Logo_White.png') : require('../../assets/SpotifyLogo/Spotify_Logo_Black.png')} 
            style={styles.spotifyLogo} />
            <Image accessibilityLabel="Track cover art" source={{ uri: item.image }} style={styles.listImage} />
            <View style={styles.textContainer}>
                <View style={styles.trackNameContainer}>
                    <Text accessibilityLabel={item.trackName} style={styles.trackName}>{truncateText(item.name, 26)}</Text>
                    {item.explicit && <ExplicitIcon />}
                </View>
                <Text accessibilityLabel={item.artistName} style={styles.artistName}>{truncateText(item.artists, 30)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image accessible={true} accessabilityLabel="playlist cover image" source={{ uri: image }} style={styles.playlistCover} />
            <View style={styles.textSection}>
                <Text accessible={true} accessibilityLabel={name} style={styles.playlistName}>{name}</Text>
                <Text accessible={true} accessibilityLabel={description} style={styles.playlistDescription}>{description}</Text>
            </View>
            <FlatList
                accessible={true} 
                accessibilityLabel="List of tracks in the playlist"
                data={tracks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default PlaylistDetailsScreen;