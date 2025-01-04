import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ResultItem from '../flatlistItems/ResultItem';
import getPlaylistData from '../api/GetTempPlaylists';

export default function ResultList(props) {
    const [refreshing, setRefreshing] = useState(false);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={props.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ResultItem
              name={item.name}
              image={item.image}
              description={item.description}
              imgSize={props.imgSize}
              headingSize={props.headingSize}
              descriptionSize={props.descriptionSize}
              artist={item.artist}
              isSelected={index === props.selectedIndex}
              onPress={() => props.onPress(index)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setRefreshing(false);
          }}
          scrollEnabled={false}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});
