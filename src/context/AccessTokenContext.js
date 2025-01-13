import React, { createContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {SpotifyRefreshToken} from '../api/Spotify - Auth/SpotifyRefreshToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

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

    const saveToken = async (accToken, refToken, expiresIn = 3600) => {
        const currentTime = Date.now();
        const expiryTime = currentTime + expiresIn * 1000;
        await SecureStore.setItemAsync('spotifyAccessToken', accToken);
        await SecureStore.setItemAsync('spotifyRefreshToken', refToken);
        await SecureStore.setItemAsync('tokenExpiryTime', expiryTime.toString());
        setAccessToken(accToken);
        setRefreshToken(refToken);
    };

    const clearToken = async () => {
        await SecureStore.deleteItemAsync('spotifyAccessToken');
        await SecureStore.deleteItemAsync('spotifyRefreshToken');
        await SecureStore.deleteItemAsync('tokenExpiryTime');
        setAccessToken(null);
        setRefreshToken(null);
    };

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