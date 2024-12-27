import { authenticateWithSpotify } from '../api/spotifyAuth';

const SearchForItem = async (accessToken, query, type) => {
    if (!accessToken) {
        alert('Access token is required');
        await authenticateWithSpotify();
    }

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    const searchParams = new URLSearchParams({
        q: query,
        type: type,
        market: 'GB', // Change this to user's country code
        limit: 5, // Adjust limit as needed
    }).toString();

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?${searchParams}`, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            if (type === "artist") {
                const artists = data.artists?.items.map((artist) => ({
                    uri: artist.uri,
                    id: artist.id,
                    name: artist.name,
                    description: artist.genres,
                    image: artist.images[0].url,
                }));
                return artists || [];
            } else if (type === "track") {
                console.log(data);
                const tracks = data.tracks?.items.map((track) => ({
                    uri: track.uri,
                    id: track.id,
                    title: track.name,
                    description: track.album.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[0].url,
                    preview_url: track.preview_url,
                }));
                return tracks || [];
            } else {
                console.error("Error: Invalid type provided.");
                throw new Error("Failed to fetch items: invalid type.");
            }
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
