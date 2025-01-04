import React, { useState, useContext } from 'react';

const handleStartGame = async (accessToken, trackIsrcs, saveGameTrackIds, navigation) => {
    try {

        saveGameTrackIds(trackIds);
        navigation.navigate('GameScreen');
    } catch (error) {
        console.error("Error starting game:", error);
    }
};

export { handleStartGame };
