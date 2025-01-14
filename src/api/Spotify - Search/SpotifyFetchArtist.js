/**
 * Function that fetches an artist using the artists name.
 * 
 * @async
 * @function fetchArtist
 * @param {string} artistName - Query containing the artists name.
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {string} market - The users ISO country code.
 * 
 * @returns {Object} - Containing artist details.
 * 
 * @throws {Error} If no artists found in the response.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/search".
 */
const fetchArtist = async (artistName, accessToken, market) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=${limit}&market=${market}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      if (data && data.artists && data.artists.items && data.artists.items.length > 0) {
        return data.artists.items; 
      } else {
        console.error("No artists found in the response or empty result.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      return [];
    }
  };

export {fetchArtist};