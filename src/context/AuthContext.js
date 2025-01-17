import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();


/**
 * AuthPorvider provides authentication state and actions to its children.
 * 
 * @param {children} children - The child components that require access to AuthContext.
 * @returns {JSX.Element} Context wrapping the children
 */
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  /**
   * Clear all tokens from state and securestore.
   * 
   * @async
   * @function clearTokens
   */
  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiryTime(null);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  };

  /**
   * Stores tokens in securestore whenever they are updated.
   * 
   * @async
   * @function storeTokens
   */
  useEffect(() => {
    const storeTokens = async() => {
      if (accessToken && refreshToken) {
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
      }
    };
    storeTokens();
  }, [accessToken && refreshToken]);

  /**
   * Loads tokens from securestore on intitial render if not already in state.
   * 
   * @async
   * @function loadTokens
   */
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