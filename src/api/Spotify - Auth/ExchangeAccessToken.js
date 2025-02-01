import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';
import { REDIRECT_URI } from '../Spotify - Util/CreateRedirectURI';

/**
 * Exchanges an authorization code for an access and refresh token.
 * 
 * @async
 * @function exchangeAuthCodeForAccessToken
 * @param {string} authCode - The authorization code obtained from Spotify's Auth endpoint.
 * @returns {array} An array containing the access and refresh token.
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
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      return [accessToken, refreshToken];
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