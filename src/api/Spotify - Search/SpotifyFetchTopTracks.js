/**
 * Function that gets queried artists' top tracks.
 * 
 * @async
 * @function fetchTopTracksByArtist
 * @param {string} artistId - The queried artists' spotifyId.
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {string} market - The users ISO country code.
 * 
 * @returns {object} containing queried artists' top tracks.
 * 
 * @throws {Error} if no tracks were found in the response.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks".
 */
const fetchTopTracksByArtist = async (artistId, accessToken, market) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      if (data && data.tracks) {
        return data.tracks;
      } else {
        console.error(`No tracks found for artist: ${artistId}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching top tracks by artist:", error);
      return [];
    }
  };

export { fetchTopTracksByArtist };