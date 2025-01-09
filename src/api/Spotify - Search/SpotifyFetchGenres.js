const fetchGenresForArtists = async (artistIds, accessToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      if (data && data.artists) {
        return data.artists.map(artist => artist.genres); // Return genres for each artist
      } else {
        console.error("No genres found for artists.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching artist genres:", error);
      return [];
    }
  };

export { fetchGenresForArtists };