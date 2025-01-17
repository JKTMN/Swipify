import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Clear all tokens from state and SecureStore
  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiryTime(null);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  };

  useEffect(() => {
    const storeTokens = async() => {
      if (accessToken && refreshToken) {
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
      }
    };
    storeTokens();
  }, [accessToken && refreshToken]);

  useEffect(() => {
    const loadTokens = async() => {
      if (!accessToken && !refreshToken) {
        setAccessToken(await SecureStore.getItemAsync('accessToken'));
        setRefreshToken(await SecureStore.getItemAsync('refreshToken'));
      } 
    };
    loadTokens();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        clearTokens,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};