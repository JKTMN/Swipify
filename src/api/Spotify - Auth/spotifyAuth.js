import * as WebBrowser from 'expo-web-browser';
import { SPOTIFY_CLIENT_ID, SCOPES } from '@env';
import { exchangeAuthCodeForAccessToken } from './ExchangeAccessToken';
import { REDIRECT_URI } from '../Spotify - Util/CreateRedirectURI';

/**
 * Authenticates the user with Spotify using OAuth 2.0.
 * 
 * @async
 * @function authenticateWithSpotify
 * @returns {array} Returns an array containing the access and refresh token.
 * 
 * @throws {Error} if Authentication or token exchange fails.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/tutorials/code-flow".
 */
const authenticateWithSpotify = async () => {

  try {
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    }).toString()}`;

    const response = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

    if (response.type === 'success' && response.url) {
      const code = response.url.split('code=')[1];
      if (code) {
        const tokens = await exchangeAuthCodeForAccessToken(code);
        return tokens;
      }
    } else {
      console.error('OAuth failed or was canceled');
    }
  } catch (error) {
    console.error('Error during Spotify authentication:', error);
  }
};

export default authenticateWithSpotify;