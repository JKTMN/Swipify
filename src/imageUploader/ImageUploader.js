import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageB64, setSelectedImageB64] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission Required', 'Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setSelectedImageB64(result.assets[0].base64);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}></View>
      )}
      <View style={styles.iconOverlay}>
        <Ionicons name="create-outline" size={40} color="#8e8e8e" />
      </View>


      {selectedImageB64 && (
        <View style={{ marginTop: 10 }}>
          <Alert>
            Base64 Length: {selectedImageB64.length}
          </Alert>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default ImageUploader;