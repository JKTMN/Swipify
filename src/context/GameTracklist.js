import React, { createContext, useState, useEffect } from 'react';

export const TracklistContext = createContext();

/**
 * TracklistContext is a context for managing track-related state within the app,
 * This context allows for the selection and management of tracks throughout the game.
 * Including, liked, disliked and recommended songs, as well as maintaining trackIds.
 * 
 * The provider component allows children components to access and modify track related states.
 * 
 * This component provides functions to save, clear and update these states, ensuring
 * consistency across the app.
 * 
 * @component
 * @param {Object} props - The properties for the component.
 * @param {Children} props.children - The child components that will use the context.
 * 
 * @returns {JSX.Element} - A provider wrapping its children with the TrackListContext.
 */

export const TracklistProvider = ({ children }) => {
    const [selectedTrack, setSelectedTrack] = useState(null); //The currently selected track.
    const [selectedTrackId, setSelectedTrackId] = useState(''); //The selected track id.
    const [gameTrackIds, setGameTrackIds] = useState([]); //Array of trackIds to be used in game.
    const [likedSongs, setLikedSongs] = useState([]); //Array of the liked songs Ids.
    const [dislikedSongs, setDislikedSongs] = useState([]); //Array of the disliked songs Ids.
    const [recommendedTrackIds, setRecommendedTrackIds] = useState([]); //Array of recommended track Ids.

    /**
     * Saves the selected track to state.
     * 
     * @function saveSelectedTrack
     * @param {string} newTrack - The track to be saved.
     */
    const saveSelectedTrack = (newTrack) => {
        setSelectedTrack(newTrack);
    };

    /**
     * Saves the array of track ids to state.
     * 
     * @function saveGameTrackIds
     * @param {array} newIds - The array of trackIds to be used in game.
     */
    const saveGameTrackIds = (newIds) => {
        setGameTrackIds(newIds);
    };


    /**
     * Adds a song to the liked songs array, if not already present.
     * 
     * @function saveLikedSongs
     * @param {string} gameLikedSong - The song the user liked.
     */
    const saveLikedSongs = (gameLikedSong) => {
        setLikedSongs((prevLikedSongs) => {
            if (!prevLikedSongs.includes(gameLikedSong)) {
                const updatedLikedSongs = [...prevLikedSongs, gameLikedSong];
                return updatedLikedSongs;
            }
            return prevLikedSongs;
        });
    };

    /**
     * Adds a song to the disliked songs array, if not already present.
     * 
     * @function saveDislikedSongs
     * @param {string} gameDislikedSong - The song the user disliked
     */
    const saveDislikedSongs = (gameDislikedSong) => {
        setDislikedSongs((prevDislikedSongs) => {
            if (!prevDislikedSongs.includes(gameDislikedSong)) {
                const updatedDislikedSongs = [...prevDislikedSongs, gameDislikedSong];
                return updatedDislikedSongs;
            }
            return prevDislikedSongs;
        });
    };

    /**
     * Saves the recommended trackIds to state.
     * 
     * @function saveRecommendedTrackIds
     * @param {Array} recommendedTracks - Array of recommended trackIds.
     */
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

    /**
     * UseEffect hook to automatically update the selected trackid,
     * whenever the selected track changes.
     */
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