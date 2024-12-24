import React, { createContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync('spotifyAccessToken');
            if (token) {
                setAccessToken(token);
            }
        };
        loadToken();
    }, []);

    const saveToken = async (token) => {
        await SecureStore.setItemAsync('spotifyAccessToken', token);
        setAccessToken(token);
    };

    const clearToken = async () => {
        await SecureStore.deleteItemAsync('spotifyAccessToken');
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, saveToken, clearToken}}>
            { children }
        </AuthContext.Provider>
    );
};