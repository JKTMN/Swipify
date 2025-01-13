import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import PlaylistItem from '../flatlistItems/PlaylistItem';

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
            // scrollEnabled={false}
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