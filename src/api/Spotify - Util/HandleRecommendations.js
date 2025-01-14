import { fetchArtist } from '../Spotify - Search/SpotifyFetchArtist';
import { fetchTracks } from '../Spotify - Search/SpotifyFetchTracks';
import { fetchGenresForArtists } from '../Spotify - Search/SpotifyFetchGenres';
import { fetchTopTracksByArtist } from '../Spotify - Search/SpotifyFetchTopTracks';

/**
 * Handler function for starting the game, it takes the artist from the selected track and makes a series of API requests to get an array of trackIds for use in the game.
 * 
 * @async
 * @function handleStartGame
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {string} artist - The artist from the selected track.
 * @param {function} navigation - For navigating between screens.
 * @param {string} market - The users ISO country code.
 * @param {function} saveGameTrackIds - For saving the trackIds to context.
 * 
 * @throws {Error} if it was unable to follow the flow to get recommendations for the game.
 */
const handleStartGame = async (accessToken, artist, navigation, market, saveGameTrackIds) => {
  if (artist) {
    try {
      const artists = await fetchArtist(artist, accessToken, market, limit=5);
      const artistIds = artists.map(artist => artist.id);

      const artistGenres = await fetchGenresForArtists(artistIds, accessToken);
      const initialArtistGenres = artistGenres[0] || [];

      const topTracks = await fetchTopTracksByArtist(artistIds[0], accessToken, market);

      const featuredArtistIds = getFeaturedArtists(topTracks);

      const featuredArtistTracks = await fetchTopTracksByArtists(featuredArtistIds, accessToken, market);

      let allTracks = topTracks.concat(featuredArtistTracks);

      const tracksWithScores = await calculateGenreAffinityScores(allTracks, initialArtistGenres, accessToken);

      let randomizedTracks = randomiseTracksWithWeighting(tracksWithScores, limit=10);

      let uniqueTracks = removeDuplicateTracks(randomizedTracks);

      const recommendedTrackIds = uniqueTracks.map(track => track.id);

      saveGameTrackIds(shuffleArray(recommendedTrackIds.slice(0, 5)));
      navigation.navigate('GameScreen');
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw new Error("Error getting recommendations", error);
    }
  } else {
    alert("No track selected, try again");
    navigation.navigate('Back');
  }
};


/**
 * Handler function for getting playlist recommendation, it takes the likedSongs array of trackIds and makes a series of API requests to get track recommendations.
 * 
 * @async
 * @function handlePlaylistRecommendations
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {array} likedSongs - Array containing the songs the user liked in the game.
 * @param {function} navigation - For navigating between screens.
 * @param {string} market - The users ISO country code.
 * @param {function} saveRecommendedTrackIds - For saving the trackIds to context.
 * @param {array} dislikedSongs - Array containing the songs the user disliked in the game.
 * 
 * @throws {Error} if it was unable to follow the flow to get recommendations for the playlist.
 */
const handlePlaylistRecommendations = async (accessToken, likedSongs, navigation, market, saveRecommendedTrackIds, dislikedSongs) => {
  if (likedSongs && likedSongs.length > 0) {
    try {
      const artistIds = await fetchTracks(accessToken, likedSongs, market);

      const artistGenres = await fetchGenresForArtists(artistIds, accessToken);

      const initialArtistGenres = artistGenres[0] || [];

      const topTracks = await fetchTopTracksByArtist(artistIds[0], accessToken, market);

      const featuredArtistIds = getFeaturedArtists(topTracks);

      const featuredArtistTracks = await fetchTopTracksByArtists(featuredArtistIds, accessToken, market);

      let allTracks = topTracks.concat(featuredArtistTracks);

      const tracksWithScores = await calculateGenreAffinityScores(allTracks, initialArtistGenres, accessToken);

      let randomizedTracks = randomiseTracksWithWeighting(tracksWithScores, 30);

      let uniqueTracks = removeDuplicateTracks(randomizedTracks);

      let removedDislikedTracksArr = removeDislikedTracks(uniqueTracks, dislikedSongs);

      let addedLikedSongs = addLikedTracks(removedDislikedTracksArr, likedSongs);

      const recommendedTrackIds = addedLikedSongs.map(track => track.id);

      saveRecommendedTrackIds(shuffleArray(recommendedTrackIds.slice(0, 30)));

      navigation.navigate('EditPlaylistDetails');
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw new Error("Error getting recommendations", error);
    }
  } else {
    alert("No tracks selected, redirecting back to home.")
    navigation.navigate('Back');
  }
};

/**
 * Function that fetches top tracks for multiple artists using their Ids.
 * 
 * @async
 * @function fetchTopTracksByArtist
 * @param {array} artistIds - Array of Spotify artistIds.
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {string} market - The users ISO country code.
 * @returns {Promise<Object[]>} An array of top tracks for the provided artists.
 */
const fetchTopTracksByArtists = async (artistIds, accessToken, market) => {
  const allTracks = [];

  for (let artistId of artistIds) {
    const tracks = await fetchTopTracksByArtist(artistId, accessToken, market);
    allTracks.push(...tracks);
  }

  return allTracks;
};

/**
 * Extract Ids of featured artists from a list of tracks.
 * 
 * @function getFeaturedArtists
 * @param {array} tracks - An array of track objects.
 * @returns {array} - An array of unique featured artistIds.
 */
const getFeaturedArtists = (tracks) => {
  let featuredArtistIds = [];
  
  tracks.forEach(track => {
    if (track.artists.length > 1) {
      track.artists.forEach(artist => {
        if (!featuredArtistIds.includes(artist.id) && track.artists[0].id !== artist.id) {
          featuredArtistIds.push(artist.id);
        }
      });
    }
  });

  return featuredArtistIds;
};

/**
 * Calculates the genre affinity score between two sets of genres.
 * 
 * @function calculateGenreAffinityScore
 * @param {array} trackGenres - An array containing genres of a track.
 * @param {array} artistGenres - An array containing genres of an artist.
 * @returns {number} - The count of matching genres between the two sets.
 * 
 * @source "https://dev.to/askyt/how-to-find-common-elements-in-two-arrays-in-javascript-1108".
 */
const calculateGenreAffinityScore = (trackGenres, artistGenres) => {
  const intersection = trackGenres.filter(genre => artistGenres.includes(genre));
  return intersection.length;
};

/**
 * Calculates the genre affinity scores for tracks based on artist genres
 * 
 * @async
 * @function calculateGenreAffinityScores
 * @param {array} tracks - Array of track objects.
 * @param {array} artistGenres - Array of artist genres. 
 * @returns {Promise<Object>} An array of tracks with their respective gere affinity scores.
 */
const calculateGenreAffinityScores = async (tracks, artistGenres) => {
  const tracksWithScores = [];

  for (let track of tracks) {
    const trackGenres = track.genres || [];
    const affinityScore = calculateGenreAffinityScore(trackGenres, artistGenres);
    tracksWithScores.push({ track, affinityScore });
  }

  return tracksWithScores;
};

/**
 * Randomises tracks with weighting based on their affinity scores.
 * 
 * @function randomiseTracksWithWeighting
 * @param {object} tracksWithScores - Array of tracks with affinity scores.
 * @param {number} limit - Number of tracks to return.
 * @returns {object} A limited array of randomised tracks based on weights.
 */
const randomiseTracksWithWeighting = (tracksWithScores, limit) => {
  const weightedTracks = tracksWithScores.map(track => ({
    track: track.track,
    weight: track.affinityScore + Math.random()
  }));

  weightedTracks.sort((a, b) => b.weight - a.weight);

  return weightedTracks.slice(0, limit).map(weightedTrack => weightedTrack.track);
};

/**
 * Remove duplicate tracks from a list of trackIds.
 * 
 * @function removeDuplicateTracks
 * @param {array} tracks - An array of tracks objects.
 * @returns {object} - An array of unique tracks.
 */
const removeDuplicateTracks = (tracks) => {
  const seen = new Set();
  const uniqueTracks = [];

  for (let track of tracks) {
    if (!seen.has(track.id)) {
      seen.add(track.id);
      uniqueTracks.push(track);
    }
  }

  return uniqueTracks;
};

/**
 * Remove disliked tracks from a list of unique tracks
 * 
 * @function removeDislikedTracks
 * @param {array} uniqueTracks - Array of unique track objects.
 * @param {array} dislikedSongs - Array of disliked trackIds.
 * @returns {object} Array of tracks excluding the disliked ones.
 */
const removeDislikedTracks = (uniqueTracks, dislikedSongs) => {
  return uniqueTracks.filter(track => !dislikedSongs.includes(track.id));
};

/**
 * Add liked tracks to a list of tracks, ensuring no duplicates.
 * 
 * @function addLikedTracks
 * @param {array} removedDislikedTracksArr - Array of tracks without disliked tracks.
 * @param {array} likedSongs - Array of liked track Ids.
 * @returns {object} - Updated array of tracks including liked tracks.
 */
const addLikedTracks = (removedDislikedTracksArr, likedSongs) => {
  likedSongs.forEach(song => {
    if (!removedDislikedTracksArr.some(track => track.id === song)) {
      removedDislikedTracksArr.push({ id: song });
    }
  });

  return removedDislikedTracksArr;
};

/**
 * Shuffle an array randomly using the fisher-yates algorithm.
 * 
 * @function shuffleArray
 * @param {array} array - Array to be shuffled
 * @returns {array} the shuffled array
 * 
 * @source "https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/".
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { handleStartGame, handlePlaylistRecommendations };