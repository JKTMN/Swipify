/**
 * Creates a playlist on the users account.
 * 
 * @async
 * @function CreatePlaylist
 * @param {Object} param - The parameters of the function.
 * @param {string} param.accessToken - The users spotify accessToken
 * @param {string} param.userId - The users spotifyId
 * @param {string} param.playlistName - The name to be used for the playlist.
 * @param {string} param.playlistDescription - The description to be used for the playlist.
 * 
 * @returns {string} The playlistId
 * 
 * @throws {Error} If the playlist creation fails.
 * 
 * @source "https://developer.spotify.com/documentation/web-api/reference/create-playlist".
 */
const CreatePlaylist = async (params) => {
    const { accessToken, userId, playlistName, playlistDescription } = params;

    if (!accessToken) {
        throw new Error('Access token is required');
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        name: playlistName,
        public: false,
        description: playlistDescription,
    });

    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const data = await response.json();

        if (response.ok) {
            const playlist = {
                id: data.id,
                uri: data.uri,
                name: data.name,
                description: data.description,
                tracks: data.tracks,
            };

            return playlist.id;
        } else {
            console.error('Error creating playlist:', data);
            throw new Error(data.error?.message || 'Failed to create playlist');
        }
    } catch (error) {
        console.error('Error creating playlist', error);
        throw error;
    }
};

export { CreatePlaylist };
