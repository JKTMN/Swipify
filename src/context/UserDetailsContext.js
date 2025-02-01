import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet } from 'react-native';

export const UserContext = createContext();

/**
 * UserContext is a context for managing user-related data such as user details, and market.
 * This context allows for saving, loading and clearing user details as well as render a user profile.
 * 
 * The provider component manages user-related data such as user details, and market.
 * It also adds the user details to AsyncStorage and allows rendering a profile view.
 * 
 * @component 
 * @param {Object} props - The properties for the component.
 * @param {Children} props.children - The child components that will use the context.
 * 
 * @returns {JSX.Element} A provider wrapping its children with the UserDetailsContext.
 */
export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [market, setMarket] = useState(null);
    const { accessToken } = useContext(AuthContext);

    const STORAGE_KEY = '@user_details';

    /**
     * Loads the user details from async storage on mount.
     */
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
    /**
     * Makes a call to the spotify API to get the current users details and stores them in AsyncStorage
     * Updates when the accessToken updates
     * @async
     * @function fetchUserProfile
     */
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (accessToken) {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    if (data) {
                        setUserDetails(data);
                        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };
    
        fetchUserProfile();
    }, [accessToken]);

    //Sets the market state when the user details update
    useEffect(() => {
        if (userDetails && userDetails.country) {
            setMarket(userDetails.country);
        }
    }, [userDetails]);

    /**
     * Renders the user profile with details such as profile picture, display name, followers,
     * and product.
     * If no user is logged in, a message prompting the user to login is rendered instead.
     * 
     * @function renderProfile
     * @param {string} theme - The current theme of the application.
     * 
     * @returns {JSX.Element} A react component displaying the users profile or a login message.
     */
    const renderProfile = (theme) => {
        if (userDetails) {
            return (
                <View style={[styles.profileContainer, { borderBottomColor: theme === 'dark' ? '#444' : '#ddd' }]}>
                    <Image source={{ uri: userDetails.images[0]?.url }} style={[styles.profileImage, {borderColor: theme === 'dark' ? '#FCFCFC' : '#2B2B2B'}]} />
                    <Text style={[styles.displayName, { color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }]}>
                        {userDetails.display_name}
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.followers, { color: theme === 'dark' ? '#FCFCFC' : '#2B2B2B' }]}>
                            {userDetails.followers.total} Followers
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

    /**
     * Clears the user details in state and AsyncStorage
     */
    const clearUserDetails = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUserDetails(null);
            setMarket(null);
        } catch (error) {
            console.error('Failed to clear user details:', error);
        }
    };

    return (
        <UserContext.Provider value={{ userDetails, market, renderProfile, clearUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 10,
        borderWidth: 2,
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
        color: '#1ED750',
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