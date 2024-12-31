const GetRecommendations = async (props) => {
    const { accessToken, seed, type } = props;

    if (!accessToken) {
        throw new Error('Access token is required');
        //get new token
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    if (type === "artist") {
        const SearchParams = new URLSearchParams ({
            limit: 30,
            market: GB, // change to users country code
            seed_artists: seed, 
        }).toString();
    } else if (type === "track") {
        const SearchParams = new URLSearchParams ({
            limit: 30,
            market: GB, // change to users country code
            seed_tracks: seed, 
        }).toString();
    } else if (type === "genre") {
        const SearchParams = new URLSearchParams ({
            limit: 30,
            market: GB, // change to users country code
            seed_genres: seed, 
        }).toString();
    } else {
        console.error('Error unknown type inputted');
        throw new Error('Failed')
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/recommendations?${searchParams}`, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();
        if (response.ok) {
            const tracks = data.tracks.item.map(({track}) => ({
                uri: data.tracks.uri,
                id: data.tracks.id,
                type: data.tracks.type,
                preview_url: data.tracks.preview_url,
                artist_name: data.tracks.artists.name,
                artist_id: data.tracks.artists.id,
                artist_uri: data.tracks.artists.uri,
                album_image: data.tracks.album.images,
                album_uri: data.tracks.album.uri,
                album_name: data.tracks.album.name,
            }));
            return tracks;
        } else {
            console.error('Error fetching recommendations:', data);
            throw new Error(data.error?.message || 'Failed to get search item');
        }
    } catch (error) {
        console.error('Error fetching recommendations', error);
        throw error;
    }
};

export { GetRecommendations };