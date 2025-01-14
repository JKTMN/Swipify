import * as AuthSession from 'expo-auth-session';

const REDIRECT_URI = AuthSession.makeRedirectUri({
  useProxy: true,
});

export { REDIRECT_URI };
