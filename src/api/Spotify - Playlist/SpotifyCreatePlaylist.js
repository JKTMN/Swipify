const CreatePlaylist = async (props) => {
    const { accessToken, userId, playlistName, playlistDescription } = props;

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
