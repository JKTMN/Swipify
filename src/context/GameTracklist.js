import React, { createContext, useContext, useState, useEffect } from 'react';

export const TracklistContext = createContext();

export const TracklistProvider = ({ children }) => {
    const [tracklist, setTracklist] = useState([]);
    const [trackUris, setTrackUris] = useState([]);

    const saveTracklist = (newTracklist) => {
        setTracklist(newTracklist);
    };

    const clearTracklist = () => {
        setTracklist([]);
    };

    const clearTrackUris = () => {
        setTrackUris([]);
    };

    useEffect(() => {
        const trackUris = tracklist.map((track) => track.uri) || [];
        setTrackUris(trackUris);
        console.log("uris:", trackUris);
    }, [tracklist]);

    return (
        <TracklistContext.Provider value={{tracklist, trackUris, saveTracklist, clearTracklist, clearTrackUris}}>
            { children }
        </TracklistContext.Provider>
    );
};