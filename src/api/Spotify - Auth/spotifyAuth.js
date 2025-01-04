import * as WebBrowser from 'expo-web-browser';
import { SPOTIFY_CLIENT_ID, SCOPES } from '@env';
import { exchangeAuthCodeForAccessToken } from './ExchangeAccessToken';
import { REDIRECT_URI } from '../Spotify - Util/CreateRedirectURI';

const authenticateWithSpotify = async () => {
  try {
    console.log(REDIRECT_URI);
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
        const accessToken = await exchangeAuthCodeForAccessToken(code);
        console.log('Access Token:', accessToken); //delete
      }
    } else {
      console.error('OAuth failed or was canceled');
    }
  } catch (error) {
    console.error('Error during Spotify authentication:', error);
  }
};

export default authenticateWithSpotify;
