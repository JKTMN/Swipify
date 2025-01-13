const getPlaylistDetails = async (AccessToken, playlistId, market) => {
    try {
        const response = await fetch (`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}?market=${market}`, {
            headers: {
                Authorization: `Bearer ${AccessToken}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            const tracks = data.tracks.items.map((item) => {
                const track = item.track;
                return {
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map(artist => artist.name).join(', '),
                    image: track.album.images[0]?.url,
                };
            });

            const playlist = [ {
                playlistId: playlistId,
                name: data.name,
                description: data.description,
                image: data.images[0].url,
                tracks: tracks,
            }];
            return playlist
        } else {
            console.error("No playlist found in the response or empty result");
            return [];
        }
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return []
    }
};

export { getPlaylistDetails };