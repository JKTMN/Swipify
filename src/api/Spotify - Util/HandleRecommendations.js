import { fetchArtist } from '../Spotify - Search/SpotifyFetchArtist';
import { fetchTracks } from '../Spotify - Search/SpotifyFetchTracks';
import { fetchGenresForArtists } from '../Spotify - Search/SpotifyFetchGenres';
import { fetchTopTracksByArtist } from '../Spotify - Search/SpotifyFetchTopTracks';

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

      let randomizedTracks = randomizeTracksWithWeighting(tracksWithScores, limit=10);

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

      let randomizedTracks = randomizeTracksWithWeighting(tracksWithScores, 30);

      let uniqueTracks = removeDuplicateTracks(randomizedTracks);

      let removedDislikedTracksArr = removeDislikedTracks(uniqueTracks, dislikedSongs);

      let addedLikedSongs = addLikedTracks(removedDislikedTracksArr, likedSongs);

      const recommendedTrackIds = addedLikedSongs.map(track => track.id);

      saveRecommendedTrackIds(shuffleArray(recommendedTrackIds.slice(0, 30)));

      navigation.navigate('PlaylistDetails');
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw new Error("Error getting recommendations", error);
    }
  } else {
    alert("No tracks selected, redirecting back to home.")
    navigation.navigate('Back');
  }
};


const fetchTopTracksByArtists = async (artistIds, accessToken, market) => {
  const allTracks = [];

  for (let artistId of artistIds) {
    const tracks = await fetchTopTracksByArtist(artistId, accessToken, market);
    allTracks.push(...tracks);
  }

  return allTracks;
};


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


const calculateGenreAffinityScore = (trackGenres, artistGenres) => {
  const intersection = trackGenres.filter(genre => artistGenres.includes(genre));
  return intersection.length;
};


const calculateGenreAffinityScores = async (tracks, artistGenres) => {
  const tracksWithScores = [];

  for (let track of tracks) {
    const trackGenres = track.genres || [];
    const affinityScore = calculateGenreAffinityScore(trackGenres, artistGenres);
    tracksWithScores.push({ track, affinityScore });
  }

  return tracksWithScores;
};


const randomizeTracksWithWeighting = (tracksWithScores, limit) => {
  const weightedTracks = tracksWithScores.map(track => ({
    track: track.track,
    weight: track.affinityScore + Math.random()
  }));

  weightedTracks.sort((a, b) => b.weight - a.weight);

  return weightedTracks.slice(0, limit).map(weightedTrack => weightedTrack.track);
};


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


const removeDislikedTracks = (uniqueTracks, dislikedSongs) => {
  return uniqueTracks.filter(track => !dislikedSongs.includes(track.id));
};


const addLikedTracks = (removedDislikedTracksArr, likedSongs) => {
  likedSongs.forEach(song => {
    if (!removedDislikedTracksArr.some(track => track.id === song)) {
      removedDislikedTracksArr.push({ id: song });
    }
  });

  return removedDislikedTracksArr;
};


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { handleStartGame, handlePlaylistRecommendations };