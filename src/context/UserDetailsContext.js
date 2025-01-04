import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [market, setMarket] = useState(null);

    const STORAGE_KEY = '@user_details';

    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                const storedDetails = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedDetails) {
                    setUserDetails(JSON.parse(storedDetails));
                }
            } catch (error) {
                console.error('Failed to load user details:', error);
            }
        };

        loadUserDetails();
    }, []);

    useEffect(() => {
        if (userDetails && userDetails.country) {
            setMarket(userDetails.country);
        }
    }, [userDetails]);

    const saveUserDetails = async (newDetails) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDetails));
            setUserDetails(newDetails);
        } catch (error) {
            console.error('Failed to save user details:', error);
        }
    };

    const clearUserDetails = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUserDetails(null);
            setMarket(null);
        } catch (error) {
            console.error('Failed to clear user details:', error);
        }
    };

    const renderProfile = (theme) => {
        if (userDetails) {
            return (
                <View style={[styles.profileContainer, { borderBottomColor: theme === 'dark' ? '#444' : '#ddd' }]}>
                    <Image source={{ uri: userDetails.images }} style={styles.profileImage} />
                    <Text style={[styles.displayName, { color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }]}>
                        {userDetails.displayName}
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.followers, { color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }]}>
                            {userDetails.followers} Followers
                        </Text>
                        <Text style={styles.product}>
                            {userDetails.product}
                        </Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.messageContainer}>
                <Text style={[styles.loginMessage, { color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }]}>
                    Please log in to view your profile.
                </Text>
            </View>
        );
    };

    return (
        <UserContext.Provider value={{ userDetails, market, saveUserDetails, clearUserDetails, renderProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    displayName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 5,
    },
    followers: {
        fontSize: 16,
    },
    product: {
        fontSize: 16,
        color: '#1DB954',
        fontWeight: 'bold',
    },
    messageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginMessage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
