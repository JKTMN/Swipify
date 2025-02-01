import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PlaylistItem from '../flatlistItems/PlaylistItem';

/**
 * A react native component that is used as the list render for the PlaylistList
 * This component utilises A flatlist for rendering the list and uses a PlaylistItem for rending list items
 * 
 * @component
 * @param {object} props - Properties passed to the component from the parent.
 * @param {array} props.data - An array containing the stored playlists
 * @returns {JSX.Element} The rendered PlaylistList
 * 
 * @example
 * // Example usage of the PlaylistList component
 * import PlaylistList from './flatlists/PlaylistList';
 * 
 * <PlaylistList data={playlists} />
 */

export default function PlaylistList({ data }) {
    const [refreshing, setRefreshing] = useState(false);
    const [playlistData, setPlaylistData] = useState([]);

    useEffect(() => {
        setPlaylistData(data.flat());
    }, [data]);

    return (
        <View accessible={true} style={styles.container}>
            <FlatList
            accessabilityLabel="List of created playlists by the user"
            data={playlistData}
            keyExtractor={(item, index) => item.playlistId ? item.playlistId.toString() : index.toString()}
            renderItem={({ item }) => (
                <PlaylistItem
                    playlistId={item.playlistId}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    tracks={item.tracks}
                />
            )}
            refreshing={refreshing}
            onRefresh={() => {
                setPlaylistData(data.flat());
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 30,
    },
});