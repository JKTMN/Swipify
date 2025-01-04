import React, { createContext, useState, useEffect } from 'react';

export const TracklistContext = createContext();

export const TracklistProvider = ({ children }) => {
    const [tracklist, setTracklist] = useState([]);
    const [trackIds, setTrackIds] = useState([]);
    const [gameTrackIds, setGameTrackIds] = useState()

    const saveTracklist = (newTracklist) => {
        setTracklist(newTracklist);
    };

    const clearTracklist = () => {
        setTracklist([]);
    };

    const clearTrackIds = () => {
        setTrackIds([]);
    };

    useEffect(() => {
        if (tracklist.length === 0) {
            setTrackIds([]);
        } else {
            const newTrackIds = tracklist.map((track) => track.id);
            setTrackIds(newTrackIds);

            console.log("Updated track IDs:", newTrackIds);
        }
    }, [tracklist]);

    return (
        <TracklistContext.Provider value={{ tracklist, trackIds, saveTracklist, clearTracklist }}>
            {children}
        </TracklistContext.Provider>
    );
};
