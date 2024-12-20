import { authorize } from 'react-native-app-auth';

const spotifyAuthConfig = {
  clientId: 'YOUR_SPOTIFY_CLIENT_ID',
  clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
  redirectUrl: 'yourapp://callback',
  scopes: ['user-read-email', 'playlist-read-private', 'user-library-read'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    revocationEndpoint: 'https://accounts.spotify.com/revoke',
  },
};

async function authenticate() {
  try {
    const result = await authorize(spotifyAuthConfig);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
