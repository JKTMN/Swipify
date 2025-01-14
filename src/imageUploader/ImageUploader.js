import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

/**
 * ImageUploader component allows the user to select and upload an image
 * The image is compressed and resized to ensure it is under the 100kb size limit
 * 
 * @component
 * @param {object} props - The properties passed to the component
 * @param {Function} props.onImageSelect - A callback function that triggers when
 * an image is successfully selected and compressed. Returns back with the base64 string containing the image as a parameter.
 * @returns {JSX.Element} the rendered ImageUploader component.
 * 
 * @example
 * //Example usage of the ImageUploader component
 * import { ImageUploader} from './imageUploader.ImageUploader
 * <ImageUploader onImageSelect={(base64) => setSelectedImageB64(base64)} />
 * 
 */

const ImageUploader = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageB64, setSelectedImageB64] = useState(null);

    /**
   * Handles the image selection process.
   * Requests permissions to access the media library, launches the image picker, 
   * and compresses the selected image to a base64 format under 100KB.
   */
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission Required', 'Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;

      const compressedImage = await compressAndResizeImageToBase64(originalUri);

      if (compressedImage) {
        setSelectedImage(compressedImage.uri);
        setSelectedImageB64(compressedImage.base64);
        onImageSelect(compressedImage.base64);
      } else {
        alert('Compression Failed', 'Unable to compress the image to under 100KB.');
      }
    }
  };

    /**
   * Compresses and resizes an image to ensure that is under 100KB.
   *
   * @param {string} uri - The URI of the original image.
   * @returns {Promise<Object|null>} A Promise resolving to an object containing the compressed image's URI and base64 string, or null if compression fails.
   */

  const compressAndResizeImageToBase64 = async (uri) => {
    const targetSize = 100 * 1024;
    let compressQuality = 0.8;
    let resizedImage = null;

    try {
      resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: false }
      );

      while (compressQuality > 0) {
        const compressedImage = await ImageManipulator.manipulateAsync(
          resizedImage.uri,
          [],
          {
            compress: compressQuality,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        const base64Length = Math.ceil((compressedImage.base64.length * 3) / 4);

        if (base64Length <= targetSize) {
          return compressedImage;
        }

        compressQuality -= 0.1;
      }
    } catch (error) {
      console.error('Error compressing image:', error);
    }

    return null;
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
          <Text>Base64 Length: {selectedImageB64.length} characters</Text>
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
    paddingLeft: 5,
  },
});

export default ImageUploader;