/**
 * Adds tracks to a specified Spotify playlist using a comma separated string of trackUris.
 * 
 * @async
 * @function AddItemsToPlaylist
 * @param {Object} params - The function parameters
 * @param {string} params.accessToken - The users spotify accessToken
 * @param {string} params.playlistId - The unique ID of the playlist to update.
 * @param {string} params.uris - A comma separated string of trackUris.
 * 
 * @throws {Error} if the tracks fail to be added.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist".
 */
const AddItemsToPlaylist = async (params) => {
    const { accessToken, playlistId, uris } = params;

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    

    const body = JSON.stringify({
        uris: uris,
        position: 0,
    });

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, ({
            method: 'POST',
            headers: headers,
            body: body,
        }));

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error adding tracks to playlist:', data);
            throw new Error (data.error?.message || 'Failed to add tracks to playlist');
        }
    } catch (error) {
        console.error('Error creating playlist', error);
        throw error;
    }
};

export { AddItemsToPlaylist };