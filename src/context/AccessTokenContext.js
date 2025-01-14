import React, { createContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {SpotifyRefreshToken} from '../api/Spotify - Auth/SpotifyRefreshToken';

export const AuthContext = createContext();

/**
 * AuthContext is a context for managing Spotify authentication tokens, including access and refresh tokens.
 * This context handles token storage, retrieval, and expiration checks
 * 
 * This component:
 * Loads tokens from secure storage.
 * Saves tokens to secure storage and state.
 * Clears tokens from secure storage and state.
 * Automatically checks and refreshes tokens if they are expired.
 * 
 * @component
 * @param {Object} props - The properties for the component.
 * @param {Children} props.children - The child components that will use the context.
 * 
 * @returns {JSX.Element} A provider wrappings its children with the AuthContext.
 * 
 * @source "https://docs.expo.dev/versions/latest/sdk/securestore/"
 */

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    /**
     * @function useEffect
     * @function loadToken
     * Runs on state change to load tokens from secure storage, check for expiration
     * and stores them in state.
     */
    useEffect(() => {
        const loadToken = async () => {
            await checkAndRefreshToken();
            const accToken = await SecureStore.getItemAsync('spotifyAccessToken');
            const refToken = await SecureStore.getItemAsync('spotifyRefreshToken');
            if (accToken && refToken) {
                setAccessToken(accToken);
                setRefreshToken(refToken);
            }
        };
        loadToken();
    }, [SecureStore.getItemAsync('spotifyAccessToken')]);


    /**
     * @function saveToken
     * 
     * Saves the spotify access and refresh tokens to the secure storage.
     * 
     * @async
     * @param {string} accToken - The spotify access token.
     * @param {string} refToken - The spotify refresh token.
     * @param {number} expiresIn - The tokens expiry time in seconds.
     */
    const saveToken = async (accToken, refToken, expiresIn = 3600) => {
        const currentTime = Date.now();
        const expiryTime = currentTime + expiresIn * 1000;
        await SecureStore.setItemAsync('spotifyAccessToken', accToken);
        await SecureStore.setItemAsync('spotifyRefreshToken', refToken);
        await SecureStore.setItemAsync('tokenExpiryTime', expiryTime.toString());
        setAccessToken(accToken);
        setRefreshToken(refToken);
    };

    /**
     * @function clearToken
     * 
     * Clears the spotify access and refresh tokens from secure storage and state.
     * 
     * @async
     */
    const clearToken = async () => {
        await SecureStore.deleteItemAsync('spotifyAccessToken');
        await SecureStore.deleteItemAsync('spotifyRefreshToken');
        await SecureStore.deleteItemAsync('tokenExpiryTime');
        setAccessToken(null);
        setRefreshToken(null);
    };

    /**
     * @function checkAndRefreshToken
     * 
     * Checks if the access token is expired and refreshes it using the refresh token.
     * 
     * @async
     */
    const checkAndRefreshToken = async () => {
        try {
            const expiryTime = await SecureStore.getItemAsync('tokenExpiryTime');
            const currentTime = Date.now();

            if (expiryTime && currentTime > parseInt(expiryTime, 10)) {
                const storedRefreshToken = await SecureStore.getItemAsync('spotifyRefreshToken');
                if (storedRefreshToken) {
                    const newAccessToken = await SpotifyRefreshToken(storedRefreshToken);
                    console.log('Token refreshed successfully:', newAccessToken);
                } else {
                    console.error('No refresh token found. User needs to log in again.');
                }
            }
        } catch (error) {
            console.error('Error during token refresh check:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, saveToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    );
};