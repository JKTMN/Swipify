// import * as AuthSession from 'expo-auth-session';

// const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: 'spotify_playlist_maker' });

// export { REDIRECT_URI };


// bottom version for tunneling
import * as AuthSession from 'expo-auth-session';

const REDIRECT_URI = AuthSession.makeRedirectUri({
  useProxy: true,
});

export { REDIRECT_URI };
