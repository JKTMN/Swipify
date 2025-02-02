import React, { createContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

const EXPIRY_KEY = 'tokenExpiry';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * AuthProvider provides authentication functionality to its children.
 * 
 * @param {children} children - The child components that require access to AuthContext
 * @returns {JSX.Element} Context wrapping the children
 */
export const AuthProvider = ({ children }) => {
  /**
   * Stores access token in secure storage with expiry time
   * 
   * @async
   * @function setAccessToken
   * @param {string} token - The access token to store
   */
  const setAccessToken = async (token) => {
    if (!token) {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(EXPIRY_KEY);
      return;
    }
    
    const expiryTime = Date.now() + 3600000; // 1 hour from now
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    await SecureStore.setItemAsync(EXPIRY_KEY, expiryTime.toString());
  };

  /**
   * Stores refresh token in secure storage
   * 
   * @async
   * @function setRefreshToken
   * @param {string} token - The refresh token to store
   */
  const setRefreshToken = async (token) => {
    if (!token) {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      return;
    }
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  };

  /**
   * Loads access token from secure storage
   * 
   * @async
   * @function loadAccessToken
   * @returns {Promise<string|null>} The stored access token or null
   */
  const accessToken = async () => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  };

  /**
   * Loads refresh token from secure storage
   * 
   * @async
   * @function loadRefreshToken
   * @returns {Promise<string|null>} The stored refresh token or null
   */
  const refreshToken = async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  };

  /**
   * Clear all tokens from secure storage
   * 
   * @async
   * @function clearTokens
   */
  const clearTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(EXPIRY_KEY);
  };

  /**
   * Checks if access token needs refresh and handles the refresh process
   * 
   * @async
   * @function checkAndRefreshToken
   */
  const checkAndRefreshToken = async () => {
    const expiryTime = await SecureStore.getItemAsync(EXPIRY_KEY);
    if (!expiryTime) return;

    const expiryTimeNum = parseInt(expiryTime, 10);
    if (Date.now() >= expiryTimeNum - 3000) {
      const refreshToken = await loadRefreshToken();
      if (refreshToken) {
        try {
          // Implement your refresh token API call here
          const response = await refreshTokenAPI(refreshToken);
          await setAccessToken(response.accessToken);
          if (response.refreshToken) {
            await setRefreshToken(response.refreshToken);
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
          await clearTokens();
        }
      }
    }
  };

  /**
   * Load tokens on mount and set up periodic token check
   */
  useEffect(() => {
    const initializeTokens = async () => {
      await loadAccessToken();
      await loadRefreshToken();
      await checkAndRefreshToken();
    };

    initializeTokens();

    // Set up interval to check token expiry
    const intervalId = setInterval(checkAndRefreshToken, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        clearTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};