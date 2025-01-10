import React, { createContext, useState, useEffect } from 'react';

export const TracklistContext = createContext();

export const TracklistProvider = ({ children }) => {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState('');
    const [gameTrackIds, setGameTrackIds] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [dislikedSongs, setDislikedSongs] = useState([]);
    const [recommendedTrackIds, setRecommendedTrackIds] = useState([]);

    const saveSelectedTrack = (newTrack) => {
        setSelectedTrack(newTrack);
    };

    const saveGameTrackIds = (newIds) => {
        setGameTrackIds(newIds);
    };

    const saveLikedSongs = (gameLikedSong) => {
        setLikedSongs((prevLikedSongs) => {
            if (!prevLikedSongs.includes(gameLikedSong)) {
                const updatedLikedSongs = [...prevLikedSongs, gameLikedSong];
                return updatedLikedSongs;
            }
            return prevLikedSongs;
        });
    };

    const saveDislikedSongs = (gameDislikedSong) => {
        setDislikedSongs((prevDislikedSongs) => {
            if (!prevDislikedSongs.includes(gameDislikedSong)) {
                const updatedDislikedSongs = [...prevDislikedSongs, gameDislikedSong];
                return updatedDislikedSongs;
            }
            return prevDislikedSongs;
        });
    };


    const saveRecommendedTrackIds = (recommendedTracks) => {
        setRecommendedTrackIds(recommendedTracks);
    };

    const clearSelectedTrack = () => {
        setSelectedTrack(null);
    };

    const clearTrackIds = () => {
        setSelectedTrackId([]);
    };

    const clearGameTrackIds = () => {
        setGameTrackIds([]);
    };

    const clearLikedSongs = () => {
        setLikedSongs([]);
    };

    const clearDislikedSongs = () => {
        setDislikedSongs([]);
    };

    const clearRecommendedTrackIds = () => {
        setRecommendedTrackIds([]);
    };

    useEffect(() => {
        if (selectedTrack) {
            setSelectedTrackId([selectedTrack.id]);
        } else {
            setSelectedTrackId('');
        }
    }, [selectedTrack]);

    return (
        <TracklistContext.Provider value={{ 
            selectedTrack, 
            selectedTrackId, 
            gameTrackIds, 
            likedSongs, 
            dislikedSongs, 
            recommendedTrackIds, 
            saveSelectedTrack, 
            saveGameTrackIds, 
            saveLikedSongs, 
            saveDislikedSongs, 
            saveRecommendedTrackIds, 
            clearSelectedTrack, 
            clearGameTrackIds, 
            clearLikedSongs, 
            clearDislikedSongs, 
            clearRecommendedTrackIds}}>
            {children}
        </TracklistContext.Provider>
    );
};
