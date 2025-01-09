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