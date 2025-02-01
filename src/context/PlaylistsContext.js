import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlaylistsContext = createContext();

/**
 * PlaylistsContext is a context for managing playlists within the app.
 * This context handles saving and retrieving playlists from AsyncStorage,
 * and provides a shared state to child components.
 * 
 * The provider component allows children components to access, and modify playlists data.
 * The component manages the retrieval, saving and clearing of playlists using AsyncStorage.
 * 
 * @component 
 * @param {Object} props - The properties for the component.
 * @param {children} props.children - The child components that will use the context.
 *  
 * @returns {JSX.Element} A provider wrapping its children with the PlaylistContext.
 */

export const PlaylistsProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(null);
    const STORAGE_KEY = '@generated_playlists';

    /**
     * useEffect hook to load the playlists from AsyncStorage on state change.
     * If playlists are found in storage they are parsed and set to state.
     * If no playlists are found, an empty array is set.
     */
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
    
    /**
     * Saves a new playlist to AsyncStorage and updates the state.
     * 
     * @function savePlaylist
     * @param {array} newPlaylist - The new playlist to be saved.
     */
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

    /**
     * Clears all playlists from AsyncStorage and resets the state.
     * @function clearPlaylists
     */
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