const AddItemsToPlaylist = async (props) => {
    const { accessToken, playlistId, uris } = props;

    if (!accessToken) {
        throw new Error('Access token is required');
        //get new token
    }

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