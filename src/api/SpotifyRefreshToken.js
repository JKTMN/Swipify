import { SPOTIFY_CLIENT_ID } from '@env';
import * as SecureStore from 'expo-secure-store';

const SpotifyRefreshToken = async (refreshToken) => {

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
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
            throw new Error('Failed to exchange refresh token for access token');
        }
    } catch (error) {
        console.error('Error during token exchange:', error);
        throw error;
    }
};

export { SpotifyRefreshToken };