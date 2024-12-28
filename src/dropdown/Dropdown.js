import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { TypeContext } from '../context/TypeContext';

const data = [
    { label: 'Artist', value: 'artist' },
    { label: 'Song', value: 'track' },
    { label: 'Genre', value: 'genre' },
];

const DropDown = () => {
    const [type, setType] = useState('artist');

    const { saveType } = useContext(TypeContext);

    useEffect(() => {
      saveType(type);
    },[type]);    

    const styles = StyleSheet.create ({
        dropdown: {
            margin: 16,
            height: 30,
            width: 95,
            backgroundColor: '#EEEEEE',
            borderRadius: 22,
            paddingHorizontal: 8,
          },
          placeholder: {
            fontSize: 16,
          },
          selectedText: {
            fontSize: 16,
          },
    })

    return (
        <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        maxHeight={200}
        value={type}
        data={data}
        valueField="value"
        labelField="label"
        placeholder="Artist"
        searchPlaceholder='Search...'
        onChange = {e => {
            setType(e.value);
        }}
        />
    );
};

export default DropDown;