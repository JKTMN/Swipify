const GetArtistsRelatedArtists = async (props) => {
    const { accessToken, artistId} = props;

    if (!accessToken) {
        throw new Error('Access token is required');
        //get new token
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, ({
            method: 'GET',
            headers: headers,
        }));

        const data = await response.json();
        if (response.ok) {
            const artists = data.artists.item.map(({artist}) => ({
                uri: data.artists.uri,
                name: data.artists.name,
                genres: data.artists.genres,
                images: data.artists.images,
            }));
            return artists;
        } else {
            console.error('Error fetching related artists:', data);
            throw new Error(DataTransfer.error?.message || 'Failed to get related artists');
        }
    } catch (error) {
        console.error('Error fetching recommendations', error);
        throw error;
    }
};

export { GetArtistsRelatedArtists };