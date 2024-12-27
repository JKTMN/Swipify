const GetArtistsTopTracks = async (props) => {
    const { accessToken, artistId } = props;

    if (!accessToken) {
        throw new Error('Access token is required');
        //get new token
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/Top-Tracks`, ({
            method: 'GET',
            headers: headers,
            // market: 'GB',
        }));

        const data = await response.json();

        if (response.ok) {
            const tracks = data.artists.item.map((track) => ({
                uri: data.tracks.uri,
                name: data.tracks.name,
                id: data.tracks.id,
                artist_name: data.tracks.artists.name,
                images: data.tracks.album.images,
                preview_url: data.tracks.preview_url,
            }));

            return tracks;
        } else {
            console.error('Error fetching top tracks:', data);
            throw new Error (data.error?.message || 'Failed to get top tracks');
        }
    } catch (error) {
        console.error('Error fetching top tracks', error);
        throw error;
    }
};

export { GetArtistsTopTracks };