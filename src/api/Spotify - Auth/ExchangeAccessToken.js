import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';
import * as SecureStore from 'expo-secure-store';
import { REDIRECT_URI } from '../Spotify - Util/CreateRedirectURI';

/**
 * Exchanges an authorisation code for an access and refresh token.
 * 
 * @async
 * @function exchangeAuthCodeForAccessToken
 * @param {string} authCode - The authorisation code obtained from Spotify's Auth endpoint.
 * @returns {Promise<void>} The access token recieved from Spotify's API.
 * 
 * @throws {Error} If the exchange process fails.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/tutorials/code-flow"
 */

const exchangeAuthCodeForAccessToken = async (authCode) => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: REDIRECT_URI,
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
  }).toString();

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: headers,
      body: body,
    });

    const data = await response.json();
    if (response.ok) {
      await SecureStore.setItemAsync('spotifyAccessToken', data.access_token);
      await SecureStore.setItemAsync('spotifyRefreshToken', data.refresh_token);
      return data.access_token;
    } else {
      console.error('Error fetching access token:', data);
      throw new Error('Failed to exchange auth code for access token');
    }
  } catch (error) {
    console.error('Error during token exchange:', error);
    throw error;
  }
};

export { exchangeAuthCodeForAccessToken };