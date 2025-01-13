# Ubiq_2_Spotify_playlist_maker
A react native app which gamifies Spotify playlist creation

# To do:
- [x] Implement check for token expiration and alert user
    - [ ] Implement refreshing token if expired
- [x] Implement saving search results to global list
    - [x] get recommendations based from search
    - [x] display on cards using web view
    - [x] store results into global list
    - [x] get recommendations based from results
    - [x] use recommendations uris for playlist creation
    - [x] Handle removing items from final results
- [x] compress image ready to be uploaded to playlist cover art
- [x] remove dropdown for type :skull: (less needs to be implemented)
    - [x] Add a new search button
- [x] once playlist is created, store details including tracks in global array
    - [x] display playlists on playlist screen
    - [x] with screen to view tracks in playlist
- [x] decide on app name and create logo
    - [x] implement on deck swipe page
- [x] ensure market is set correctly for each api call 
- [x] Handle checking if disliked songs are in final results and remove them
- [x] Handle removing track from disliked song if user went back and reliked the song
- [ ] Remove scroll from game card