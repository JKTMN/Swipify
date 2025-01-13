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
            const currentTime = Date.now();
            const expiresIn = data.expires_in || 3600;
            const expiryTime = currentTime + expiresIn * 1000;

            await SecureStore.setItemAsync('spotifyAccessToken', data.access_token);
            await SecureStore.setItemAsync('spotifyRefreshToken', refreshToken);
            await SecureStore.setItemAsync('tokenExpiryTime', expiryTime.toString());

            return data.access_token;
        } else {
            console.error('Error refreshing access token:', data);
            throw new Error('Failed to refresh access token');
        }
    } catch (error) {
        console.error('Error during token refresh:', error);
        throw error;
    }
};

export { SpotifyRefreshToken };
