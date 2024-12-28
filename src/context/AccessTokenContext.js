import React, { createContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const accToken = await SecureStore.getItemAsync('spotifyAccessToken');
            const refToken = await SecureStore.getItemAsync('spotifyRefreshToken');
            if (accToken && refToken) {
                setAccessToken(accToken);
                setRefreshToken(refToken);

            }
        };
        loadToken();
    }, []);

    const saveToken = async (accToken, refToken) => {
        await SecureStore.setItemAsync('spotifyAccessToken', accToken);
        await SecureStore.setItemAsync('spotifyRefreshToken', refToken);
        setAccessToken(accToken);
        setRefreshToken(refToken);
    };

    const clearToken = async () => {
        await SecureStore.deleteItemAsync('spotifyAccessToken');
        await SecureStore.deleteItemAsync('spotifyRefreshToken');
        setAccessToken(null);
        setRefreshToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, saveToken, clearToken}}>
            { children }
        </AuthContext.Provider>
    );
};