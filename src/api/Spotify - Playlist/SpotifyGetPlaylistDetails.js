/**
 * Gets the details of a specified Spotify playlist using a playlistId.
 * 
 * @async
 * @function getPlaylistDetails
 * @param {Object} params - The function parameters
 * @param {string} params.accessToken - The users spotify accessToken
 * @param {string} params.playlistId - The playlistId of the specific playlist
 * @param {string} params.market - The users ISO country code.
 *
 * @throws {Error} if no playlist was found in the response.
 * 
 * @returns {Object} an object containing the specified playlists data.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/get-playlist".
 */
const getPlaylistDetails = async (accessToken, playlistId, market) => {
    try {
        const response = await fetch (`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}?market=${market}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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