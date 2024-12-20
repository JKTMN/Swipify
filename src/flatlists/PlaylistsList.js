import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import PlaylistItem from '../flatlistItems/PlaylistItem';
import getPlaylistData from '../api/GetTempPlaylists';

export default function PlaylistList({ data }) {
    const [playlistData, setPlaylistData] = useState(data);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setPlaylistData(data);
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            keyExtractor={( item ) => item.id}
            renderItem={({ item }) => (
                <PlaylistItem
                title={item.title}
                image={item.image}
                description={item.description}
                />
            )}
            refreshing={refreshing}
            onRefresh={() => {
                setPlaylistData(getPlaylistData());
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});