const fetchTrackDetails = async (accessToken, tracks, market) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${encodeURIComponent(tracks)}&market=${market}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            const tracks = data.tracks.map((track) => {
                return {
                    uri: track.uri,
                    id: track.id,
                    name: track.name,
                    description: track.album.name,
                    artist: track.artists?.map(artist => artist.name).join(', '),
                    image: track.album.images[0]?.url,
                };
            });
            return tracks;
        } else {
            console.error("No tracks found in the response or empty result");
            return [];
        }
    } catch (error) {
        console.error("Error fetching tracks:", error);
        return [];
    }
};

export { fetchTrackDetails };