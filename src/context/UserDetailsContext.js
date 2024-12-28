import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [market, setMarket] = useState(null);

    const STORAGE_KEY = '@user_details';

    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                const storedDetails = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedDetails) {
                    setUserDetails(JSON.parse(storedDetails));
                }
            } catch (error) {
                console.error('Failed to load user details:', error);
            }
        };

        loadUserDetails();
    }, []);

    useEffect(() => {
        if (userDetails && userDetails.country) {
            const market = userDetails.country;
            setMarket(market);
        }
    }, [userDetails]);

    const saveUserDetails = async (newDetails) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDetails));
            setUserDetails(newDetails);
        } catch (error) {
            console.error('Failed to save user details:', error);
        }
    };

    const clearUserDetails = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setUserDetails(null);
            setMarket(null);
        } catch (error) {
            console.error('Failed to clear user details:', error);
        }
    };

    return (
        <UserContext.Provider value={{ userDetails, market, saveUserDetails, clearUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
