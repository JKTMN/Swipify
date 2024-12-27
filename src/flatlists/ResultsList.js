import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ResultItem from '../flatlistItems/ResultItem';
import getPlaylistData from '../api/GetTempPlaylists';

export default function ResultList(props) {
    const [ResultData, setResultData] = useState(props.data);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setResultData(props.data);
    }, [props.data]);

    return (
        <View style={styles.container}>
            <FlatList
            data={props.data}
            keyExtractor={( item ) => item.id}
            renderItem={({ item }) => (
                <ResultItem
                name={item.name}
                image={item.image}
                description={item.description}
                imgSize={props.imgSize}
                headingSize={props.headingSize}
                descriptionSize={props.descriptionSize}
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