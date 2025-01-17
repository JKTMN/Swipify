/**
 * Function that fetches track details using an array of trackIds.
 * 
 * @async
 * @function fetchTrackDetails
 * @param {string} accessToken - The users Spotify accessToken.
 * @param {array} tracks - An array of trackIds.
 * @param {string} market - The users ISO country code.
 * 
 * @returns {Object} - containing track details.
 * 
 * @throws {Error} If no tracks were found in the response.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/get-several-tracks".
 */
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
                    explicit: track?.explicit,
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