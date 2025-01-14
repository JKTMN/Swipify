# Ubiq_2_Spotify Playlist Maker

A React Native app that gamifies the creation of Spotify playlists by letting users swipe through songs, adding their favorites to a playlist.

## Table of Contents

1. [How to Set Up](#how-to-setup)
2. [Spotify Developer Setup](#spotify-developer-setup)
3. [Running the App](#running-the-app)
4. [Common Issues](#common-issues)

## How to Set Up

1. **Install Dependencies:**
   - Ensure you have Node.js installed.
   - Run `npm install` to install all the necessary dependencies.

2. **Set Up `.env` File:**
   - Create a `.env` file in the project root directory.
   - Ensure `.env` is set in `.gitignore`.
   - Add the following variables to the `.env` file:
     ```plaintext
     SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     SCOPES=user-read-private user-read-email ugc-image-upload playlist-modify-public playlist-modify-private streaming user-read-playback-state user-modify-playback-state
     ```

3. **Spotify Developer Setup:**
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/) and set up a new Spotify app.
   - Fill in the app's name and description, and select "Web API" and "Web Playback SDK".
   - In the **Redirect URIs** section, add the IP address you'll be using to run the app (see below).
   - Once your app is created, copy the `Client ID` and `Client Secret` from the Spotify Developer Dashboard and paste them into your `.env` file.

## Running the App

1. **Start the App:**
   - Run `expo start` to start the app.
   - After starting, make a note of the IP address shown under the label `Metro waiting on:`. It should look something like:
     ```
     exp://10.124.188.108:8081
     ```
   
2. **Set the Redirect URI in Spotify:**
   - Go back to your [Spotify Developer Dashboard](https://developer.spotify.com/) and paste the noted IP address (from the `expo start` output) as the **Redirect URI** in the Spotify app settings.

3. **Authenticate with Spotify:**
   - When prompted, log in to your Spotify account to authorize the app.
   - The app should now be able to fetch your Spotify data and interact with your playlists.

## Common Issues

### 1. **Access Token Expired:**
   - If you authenticate with Spotify and get the error "The access token expired," try restarting the app.
   - This can happen when the token expires due to inactivity or long usage. Simply restarting the app should resolve the issue.
   - If the problem persists after restarting, reauthenticate and restart the app again.

### 2. **Error in Redirect URI:**
   - If you encounter errors related to the Redirect URI, double-check that the IP address in your `.env` file matches the one shown when you run `expo start`.
