import React, { createContext, useState, useEffect } from 'react';

export const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [likedSongsUris, setLikedSongsUris] = useState([]);

    const saveLikedSongs = (newSongs) => {
        setLikedSongs(newSongs);
    };

    const clearLikedSongs = () => {
        setLikedSongs([]);
    };

    useEffect(() => {
        if (likedSongs.length === 0) {
            setLikedSongsUris([]);
        } else {
            const trackUris = likedSongs.map((track) => track.uri) || [];
            setLikedSongsUris(trackUris);
        }
        console.log("Uris:", likedSongsUris);
    }, [likedSongs]);

    return ( 
        <LikedSongsContext.Provider value={{likedSongs, likedSongsUris, saveLikedSongs, clearLikedSongs}}>
            { children }
        </LikedSongsContext.Provider>
    );
};