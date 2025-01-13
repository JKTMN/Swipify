const fetchTracks = async (accessToken, likedSongs, market) => {
    try {
      if (!likedSongs || likedSongs.length === 0) {
        console.error("The likedSongs array is empty or undefined.");
        return [];
      }
  
  
      const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${encodeURIComponent(likedSongs)}&market=${market}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.tracks.flatMap(track => track.artists.map(artist => artist.id));
      } else {
        console.error("No tracks found in the response or empty result.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [];
    }
  };

export { fetchTracks };