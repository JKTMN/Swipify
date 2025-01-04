const SearchForItem = async (accessToken, query, market) => {
    const type = 'track';

    if (!accessToken) {
        alert('No valid access token available, please log in.');
        return;
    }

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    const searchParams = new URLSearchParams({
        q: query,
        type: type,
        market: market,
        limit: 5,
    }).toString();

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?${searchParams}`, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (response.ok) {
            const tracks = data.tracks?.items.map((track) => {
                return {
                    uri: track.uri,
                    id: track.id,
                    name: track.name,
                    description: track.album.name,
                    artist: track.artists[0]?.name,
                    image: track.album.images[0]?.url,
                };
            });

            return tracks || [];
        } else {
            console.error("Error fetching search item:", data);
            throw new Error(data.error?.message || "Failed to get search item.");
        }
    } catch (error) {
        console.error("Error fetching search item:", error);
        throw error;
    }
};

export { SearchForItem };