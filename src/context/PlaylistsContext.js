import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlaylistsContext = createContext();

export const PlaylistsProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(null);

    const STORAGE_KEY = '@generated_playlists';

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const storedPlaylists = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedPlaylists) {
                    const parsedData = JSON.parse(storedPlaylists);
    
                    setPlaylists(Array.isArray(parsedData) ? parsedData : []);
                } else {
                    setPlaylists([]);
                }
            } catch (error) {
                console.error('Failed to load playlists', error);
            }
        };
    
        loadPlaylists();
    }, []);
    

    const savePlaylist = async (newPlaylist) => {
        try {
            const storedPlaylists = await AsyncStorage.getItem(STORAGE_KEY);
            const existingPlaylists = storedPlaylists ? JSON.parse(storedPlaylists) : [];
    
            const updatedPlaylists = [...existingPlaylists, newPlaylist];
    
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlaylists));
    
            setPlaylists(updatedPlaylists);
        } catch (error) {
            console.error('Failed to save new playlist', error);
        }
    };

    const clearPlaylists = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setPlaylists([]);
        } catch (error) {
            console.error('Failed to clear playlists:', error);
        }
    };

    return (
        <PlaylistsContext.Provider value={{ playlists, savePlaylist, clearPlaylists }}>
            {children}
        </PlaylistsContext.Provider>
    );
};
