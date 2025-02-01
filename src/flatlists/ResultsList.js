import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ResultItem from '../flatlistItems/ResultItem';

/**
 * A react native component that is used as the list render for the ResultList
 * This component utilises A flatlist for rendering the list and uses a ResultItem for rending list items
 * 
 * @component
 * @param {object} props - Properties passed to the component
 * @param {array} props.data - An array containing tracks from either the search, or recommendations
 * @param {bool} props.isSelected - an index of which track is selected
 * @param {Function} props.onPress - The function that should be called when the button/list item is pressed
 * @returns {JSX.Element} The rendered ResultList
 * 
 * @example
 * // Example usage of the ResultList component
 * import ResultList from './flatlists/ResultList';
 * 
 * <ResultList
    data={results}
    selectedIndex={selectedIndex}
    onPress={handleItemPress}
    />
 */

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
            artist={item.artist}
            explicit={item.explicit}
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
