import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ResultItem from '../flatlistItems/ResultItems';
import getPlaylistData from '../api/GetTempPlaylists';

export default function ResultList({ data }) {
    const [ResultData, setResultData] = useState(data);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setResultData(data);
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            keyExtractor={( item ) => item.id}
            renderItem={({ item }) => (
                <ResultItem
                title={item.title}
                image={item.image}
                description={item.description}
                />
            )}
            refreshing={refreshing}
            onRefresh={() => {
                setResultData(getPlaylistData());
            }}
            scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});