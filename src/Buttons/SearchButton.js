import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchButton = ({onPress}) => {

    const styles = StyleSheet.create ({
        searchButton: {
            backgroundColor: '#1ED750',
            borderColor: '#1ED750',
            borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginLeft: 8,
            height: 40,
        },
        searchButtonText: {
            color: '#2B2B2B',
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity 
        accessability={true}
        accessabilityRole="button"
        accessabilityHint="This button will search your query"
        style={styles.searchButton} 
        onPress={onPress}>
            <Text accessabilityLabel="search button" style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
    );
};

export default SearchButton;